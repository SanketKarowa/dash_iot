export function getBatteryColor(voltage: number, min: number, max: number): string {
  const range = max - min;
  const percentage = Math.max(0, Math.min(100, ((voltage - min) / range) * 100));

  if (percentage < 20) return 'var(--color-danger)';
  if (percentage < 50) return 'var(--color-warning)';
  return 'var(--color-success)';
}
