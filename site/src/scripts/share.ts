/** The share scene's real button: lazily loads the demo bundle and draws the card with RoFit's own canvas renderer. */
import { loadDemo } from './demo-loader';
export function initShare() {
  const btn = document.getElementById('share-save') as HTMLButtonElement | null;
  const hint = document.getElementById('share-hint');
  const scene = document.getElementById('share');
  if (!btn || !scene) return;

  const unlock = () => { btn.disabled = Number(getComputedStyle(scene).getPropertyValue('--p5')) < 0.6 && document.documentElement.dataset.motion === 'full'; };
  new MutationObserver(unlock).observe(scene, { attributes: true, attributeFilter: ['style', 'data-step'] });
  unlock();

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    if (hint) hint.textContent = 'Drawing it…';
    try {
      const mod = await loadDemo();
      // The card is always drawn in the light palette so it reads the same wherever it is shared.
      const root = document.createElement('div');
      root.style.cssText = '--rf-bg:#ffffff;--rf-fg:#14151a;--rf-accent:#2a4bff;--rf-surface:#f5f6f9;--rf-surface-2:#eceef3;--rf-muted:#6a7287;--rf-line:#e3e4e8;position:absolute;left:-9999px;font-family:Onest Variable,Onest,sans-serif';
      document.body.appendChild(root);
      await document.fonts.load('800 20px "Unbounded Variable"').catch(() => {});
      await document.fonts.load('700 20px "Onest Variable"').catch(() => {});
      const blob: Blob = await mod.makeCard(Number(document.getElementById('share-card')?.dataset.outfit), root);
      root.remove();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'rofit-outfit-card.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
      if (hint) hint.textContent = 'Saved. That file was made on your device and went nowhere.';
    } catch {
      if (hint) hint.textContent = 'Couldn’t draw the card here. The extension’s version works on any profile.';
    }
    btn.disabled = false;
  });
}
