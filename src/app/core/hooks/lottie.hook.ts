import { AnimationItem } from 'lottie-web';
import lottie from 'lottie-web';

/**
 * Lottie animation utility hook
 * Use this for loader/placeholder animations
 */
export function useLottieAnimation(
  container: HTMLElement,
  animationPath: string,
  options?: {
    loop?: boolean;
    autoplay?: boolean;
    renderer?: 'svg' | 'canvas' | 'html';
  }
): AnimationItem | null {
  try {
    return lottie.loadAnimation({
      container,
      renderer: options?.renderer || 'svg',
      loop: options?.loop !== undefined ? options.loop : true,
      autoplay: options?.autoplay !== undefined ? options.autoplay : true,
      path: animationPath
    });
  } catch (error) {
    console.warn('Lottie animation failed to load:', animationPath, error);
    return null;
  }
}

/**
 * Lottie configuration interface for future directive implementation
 */
export interface LottieConfig {
  path: string;
  loop?: boolean;
  autoplay?: boolean;
  renderer?: 'svg' | 'canvas' | 'html';
}
