import { Component, inject, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-background-secondary border-b border-[#f3f3f3] dark:border-[#252525] sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <a routerLink="/dashboard" class="flex items-center gap-3 group cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 dark:from-primary dark:to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-black text-primary tracking-tight leading-none">
                SHIVAM
              </span>
              <span class="text-[10px] font-semibold text-text-secondary uppercase tracking-wider leading-tight mt-0.5">
                Inventory & Warehouse
              </span>
            </div>
          </a>
          
          <nav class="hidden md:flex items-center gap-2">
            <a
              routerLink="/dashboard"
              routerLinkActive="active-menu"
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-background/50 transition-all duration-200 font-medium text-sm"
            >
              Dashboard
            </a>
            
            <a
              routerLink="/products"
              routerLinkActive="active-menu"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-background/50 transition-all duration-200 font-medium text-sm"
            >
              Products
            </a>
            
            <a
              routerLink="/suppliers"
              routerLinkActive="active-menu"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-background/50 transition-all duration-200 font-medium text-sm"
            >
              Suppliers
            </a>
            
            <a
              routerLink="/alerts"
              routerLinkActive="active-menu"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-background/50 transition-all duration-200 font-medium text-sm"
            >
              Alerts
            </a>
            
            <a
              routerLink="/settings"
              routerLinkActive="active-menu"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3 py-2 rounded-lg text-text-secondary hover:text-text hover:bg-background/50 transition-all duration-200 font-medium text-sm"
            >
              Settings
            </a>
          </nav>
          
          <div class="flex items-center gap-3">
            <button
              (click)="themeService.toggleTheme()"
              class="p-2 rounded-lg hover:bg-background/50 transition-all duration-200"
              [attr.aria-label]="themeService.theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
            >
              <svg *ngIf="themeService.theme() === 'light'" class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg *ngIf="themeService.theme() === 'dark'" class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            
            <!-- Profile Dropdown -->
            <div class="relative" #profileDropdown>
              <button
                (click)="toggleProfileMenu()"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background/50 transition-all duration-200"
                aria-label="Profile menu"
              >
                <div class="text-right hidden lg:block">
                  <div class="text-sm font-medium text-text">Vijay P</div>
                  <div class="text-xs text-text-secondary">Administrator</div>
                </div>
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  VP
                </div>
                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div
                *ngIf="isProfileMenuOpen"
                class="absolute right-0 mt-2 w-56 glass rounded-xl border border-border shadow-xl overflow-hidden z-50"
              >
                <div class="p-2">
                  <div class="px-4 py-3 border-b border-border-light">
                    <p class="font-semibold text-text">Vijay P</p>
                    <p class="text-sm text-text-secondary">vijay.p&#64;company.com</p>
                  </div>
                  
                  <button
                    (click)="navigateToProfile()"
                    class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="text-text">My Profile</span>
                  </button>
                  
                  <button
                    (click)="navigateToAccount()"
                    class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-text">Account Settings</span>
                  </button>
                  
                  <button
                    (click)="logout()"
                    class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  isProfileMenuOpen = false;
  @ViewChild('profileDropdown', { static: false }) profileDropdown!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.profileDropdown && !this.profileDropdown.nativeElement.contains(event.target)) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }

  navigateToProfile(): void {
    // Navigate to profile page
    this.closeProfileMenu();
  }

  navigateToAccount(): void {
    // Navigate to account settings
    this.closeProfileMenu();
  }

  logout(): void {
    // Handle logout
    this.closeProfileMenu();
  }
}
