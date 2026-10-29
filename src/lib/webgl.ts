/**
 * WebGL capability and hardware acceleration detection utility.
 * Used to gracefully switch between full 3D interactive canvases
 * and optimized 2D/SVG procedural fallbacks.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl && gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext));
  } catch {
    return false;
  }
}

/**
 * Check if the user agent is a low-power mobile or tablet device
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check device memory if supported (Chrome/Edge)
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

  // Detect low power profile
  if (cores <= 2 || memory <= 2) {
    return true;
  }

  // Detect if battery level is critically low or in power-save mode if API is available
  return false;
}
