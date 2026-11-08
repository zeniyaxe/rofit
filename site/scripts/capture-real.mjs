// Captures a dated snapshot of PUBLIC Roblox data for the site's "real profiles" demo.
//   node scripts/capture-real.mjs 80254 12345 ...   (user ids)  ->  public/real/snapshot.json + public/real/img/*.png
// Only read-only, unauthenticated endpoints that return what any signed-out visitor sees. Saved outfits a user keeps
// private simply do not come back, and we never try another way. Roblox presets (isEditable:false) are excluded.
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const site = resolve(import.meta.dirname, '..');
const out = resolve(site, 'public/real');
mkdirSync(resolve(out, 'img'), { recursive: true });
const MAX_OUTFITS = 8;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ids = process.argv.slice(2).map(Number).filter(Boolean);

async function j(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { accept: 'application/json' } });
    if (r.status === 429) { await sleep(2500 * (i + 1)); continue; }
    if (!r.ok) return null;
    await sleep(220);
    return r.json();
  }
  return null;
}
async function img(url, file) {
  const dest = resolve(out, 'img', file);
  if (existsSync(dest)) return '/real/img/' + file;
  const r = await fetch(url); if (!r.ok) return null;
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  await sleep(120);
  return '/real/img/' + file;
}
const thumbUrl = async (api) => { const t = await j(api); const d = t?.data?.[0]; return d?.state === 'Completed' ? d.imageUrl : null; };

const prev = existsSync(resolve(out, 'snapshot.json')) ? JSON.parse(readFileSync(resolve(out, 'snapshot.json'), 'utf8')) : { users: [], assets: {} };
const snap = { capturedAt: new Date().toISOString(), users: [], assets: prev.assets ?? {} };

for (const id of ids) {
  const u = await j(`https://users.roblox.com/v1/users/${id}`);
  if (!u || u.isBanned) { console.log(id, 'unavailable'); continue; }
  const list = await j(`https://avatar.roblox.com/v2/avatar/users/${id}/outfits?outfitType=Avatar&itemsPerPage=50`);
  if (!list) { console.log(id, u.name, 'outfit list unavailable (Roblox refused or rate-limited): left as it was, not treated as "none"'); const old = prev.users.find((x) => x.id === id); if (old) snap.users.push(old); continue; }
  const saved = (list.data ?? []).filter((o) => o.isEditable).slice(0, MAX_OUTFITS);
  console.log(id, u.name, 'saved outfits visible:', saved.length);
  if (!saved.length) continue;
  const rec = { id, name: u.name, displayName: u.displayName, verified: !!u.hasVerifiedBadge, outfits: [] };
  const headshot = await thumbUrl(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=150x150&format=Png`);
  rec.headshot = headshot ? await img(headshot, `u${id}-head.png`) : null;
  for (const o of saved) {
    const d = await j(`https://avatar.roblox.com/v3/outfits/${o.id}/details`);
    const t = await thumbUrl(`https://thumbnails.roblox.com/v1/users/outfits?userOutfitIds=${o.id}&size=420x420&format=Png&isCircular=false`);
    if (!d || !t) { console.log('  skip outfit', o.id); continue; }
    const thumb = await img(t, `o${o.id}.png`);
    for (const a of d.assets ?? []) {
      if (snap.assets[a.id]) continue;
      const e = await j(`https://economy.roblox.com/v2/assets/${a.id}/details`);
      const at = await thumbUrl(`https://thumbnails.roblox.com/v1/assets?assetIds=${a.id}&size=150x150&format=Png`);
      snap.assets[a.id] = {
        id: a.id, name: e?.Name ?? a.name, typeId: a.assetType?.id ?? e?.AssetTypeId, typeName: a.assetType?.name,
        creator: e?.Creator ? { id: e.Creator.Id, name: e.Creator.Name, type: e.Creator.CreatorType, verified: !!e.Creator.HasVerifiedBadge } : null,
        price: e?.PriceInRobux ?? null, forSale: !!e?.IsForSale, limited: !!(e?.IsLimited || e?.IsLimitedUnique), resolved: !!e,
        thumb: at ? await img(at, `a${a.id}.png`) : null,
      };
    }
    rec.outfits.push({
      id: o.id, name: o.name, thumb, avatarType: d.playerAvatarType, bodyColors: d.bodyColor3s ?? null, scale: d.scale ?? null,
      assets: (d.assets ?? []).map((a) => ({ id: a.id, name: a.name, typeId: a.assetType?.id, typeName: a.assetType?.name })),
    });
    console.log('  +', o.name, (d.assets ?? []).length, 'items');
  }
  if (rec.outfits.length) snap.users.push(rec);
}
writeFileSync(resolve(out, 'snapshot.json'), JSON.stringify(snap));
console.log('wrote snapshot:', snap.users.length, 'users,', Object.keys(snap.assets).length, 'assets');
