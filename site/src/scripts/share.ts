/** "Save this card as a PNG": lazily loads the demo bundle and draws the card with RoFit's own canvas renderer. */
import { loadDemo } from './demo-loader';

export function initShare() {
  const btn = document.getElementById('share-save') as HTMLButtonElement | null;
  const hint = document.getElementById('share-hint');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    if (hint) hint.textContent = 'Drawing it…';
    try {
      const mod = await loadDemo();
      // The card is always drawn in the light palette so it reads the same wherever it is shared.
      const root = document.createElement('div');
      root.style.cssText = '--rf-bg:#ffffff;--rf-fg:#0c0c0d;--rf-accent:#c8104f;--rf-surface:#f4f4f1;--rf-surface-2:#e9e9e4;--rf-muted:#66666e;--rf-line:#e4e4e0;position:absolute;left:-9999px;font-family:"Onest Variable",Onest,sans-serif';
      document.body.appendChild(root);
      await document.fonts.load('700 20px "Onest Variable"').catch(() => {});
      const blob: Blob = await mod.makeCard(Number(document.getElementById('share-card')?.dataset.outfit), root);
      root.remove();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'rofit-outfit-card.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
      if (hint) hint.textContent = 'Saved. The file was made on your device and went nowhere.';
    } catch {
      if (hint) hint.textContent = 'Couldn’t draw the card here. The extension’s own version works on any profile.';
    }
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
  });
}
