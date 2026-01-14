import { Directive, ElementRef, OnInit, AfterViewInit, inject, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appGsapIntro]',
  standalone: true
})
export class GsapIntroDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    gsap.from(this.el.nativeElement, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
}

@Directive({
  selector: '[appGsapScroll]',
  standalone: true
})
export class GsapScrollDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private tween: gsap.core.Tween | null = null;

  ngAfterViewInit(): void {
    this.tween = gsap.from(this.el.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.el.nativeElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tween) {
      this.tween.kill();
    }
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === this.el.nativeElement) {
        trigger.kill();
      }
    });
  }
}

export function useGsapIntro(element: HTMLElement, delay: number = 0): void {
  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay,
    ease: 'power2.out'
  });
}

export function useGsapCountUp(element: HTMLElement, targetValue: number, duration: number = 2): void {
  const obj = { count: 0 };
  gsap.to(obj, {
    count: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.count).toLocaleString();
    }
  });
}

export function useGsapStagger(elements: HTMLElement[], delay: number = 0.1): void {
  gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: delay,
    ease: 'power2.out'
  });
}

export function useGsapTypewriter(element: HTMLElement, text: string, speed: number = 50): void {
  element.textContent = '';
  const chars = text.split('');
  chars.forEach((char, index) => {
    gsap.delayedCall(index * (speed / 1000), () => {
      element.textContent += char;
    });
  });
}

export function useGsapScrollAnimation(element: HTMLElement, delay: number = 0): void {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

export function initScrollAnimations(): void {
  // Animate all elements with data-animate attribute
  gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((element, index) => {
    const animationType = element.getAttribute('data-animate') || 'fadeInUp';
    
    if (animationType === 'fadeInUp') {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    } else if (animationType === 'fadeInLeft') {
      gsap.from(element, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    } else if (animationType === 'fadeInRight') {
      gsap.from(element, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    } else if (animationType === 'scaleIn') {
      gsap.from(element, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });

  // Animate glass cards on scroll
  gsap.utils.toArray<HTMLElement>('.glass, .glass-card, .glass-gradient').forEach((element, index) => {
    gsap.from(element, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.6,
      delay: index * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}
