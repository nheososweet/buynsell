export function mmToPx(mm: number): number {
  const mmPerInch = 25.4;
  const dpi = 96;
  return (mm / mmPerInch) * dpi;
}
