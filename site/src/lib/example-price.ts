// Stable across the site previews and exported demo card. These values are illustrative.
export function examplePrice(assetId: number): string {
  const amounts = [125, 250, 350, 450, 600, 750];
  return 'R$ ' + amounts[assetId % amounts.length];
}
