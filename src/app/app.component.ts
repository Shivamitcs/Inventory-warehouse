import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ThemeService } from './core/services/theme.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ScrollToTopComponent],
  template: `
    <div class="min-h-screen flex flex-col" style="background-color: rgb(var(--color-background));">
      <app-header></app-header>
      
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
      <app-scroll-to-top></app-scroll-to-top>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private subscription?: Subscription;

  ngOnInit(): void {
    // Theme is initialized in ThemeService constructor
    
    // Scroll to top on route change
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
