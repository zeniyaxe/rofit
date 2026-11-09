export function isDisplayAsset(asset: { typeName: string }): boolean {
  return asset.typeName !== 'MoodAnimation';
}
