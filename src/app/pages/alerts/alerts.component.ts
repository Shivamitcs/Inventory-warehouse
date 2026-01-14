import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeIn } from '../../core/utils/animations';
import { useGsapIntro } from '../../core/hooks/gsap.hook';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  animations: [fadeIn],
  templateUrl: './alerts.component.html',
  styles: []
})
export class AlertsComponent implements AfterViewInit {
  @ViewChild('pageContainer', { static: false }) pageContainer!: ElementRef;

  ngAfterViewInit(): void {
    if (this.pageContainer?.nativeElement) {
      useGsapIntro(this.pageContainer.nativeElement);
    }
  }
}
