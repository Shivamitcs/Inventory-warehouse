import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fadeIn } from '../../core/utils/animations';
import { useGsapIntro } from '../../core/hooks/gsap.hook';
import { ThemeService } from '../../core/services/theme.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [fadeIn],
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('pageContainer', { static: false }) pageContainer!: ElementRef;
  themeService = inject(ThemeService);
  lowStockThreshold = 20;
  criticalStockThreshold = 10;

  ngAfterViewInit(): void {
    if (this.pageContainer?.nativeElement) {
      useGsapIntro(this.pageContainer.nativeElement);
    }
  }
}
