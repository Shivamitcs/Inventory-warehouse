import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeIn, slideUp, staggerFade } from '../../core/utils/animations';
import { useGsapIntro, useGsapCountUp } from '../../core/hooks/gsap.hook';
import { useLottieAnimation } from '../../core/hooks/lottie.hook';
import { gsap } from 'gsap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  animations: [fadeIn, slideUp, staggerFade],
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageContainer', { static: false }) pageContainer!: ElementRef;
  @ViewChild('kpiValue', { static: false }) kpiValue!: ElementRef;
  @ViewChild('kpiHealth', { static: false }) kpiHealth!: ElementRef;
  @ViewChild('kpiWarehouses', { static: false }) kpiWarehouses!: ElementRef;
  @ViewChild('kpiOrders', { static: false }) kpiOrders!: ElementRef;
  @ViewChild('capacityA', { static: false }) capacityA!: ElementRef;
  @ViewChild('capacityB', { static: false }) capacityB!: ElementRef;
  @ViewChild('capacityC', { static: false }) capacityC!: ElementRef;
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @ViewChild('inboundLine', { static: false }) inboundLine!: ElementRef;
  @ViewChild('outboundLine', { static: false }) outboundLine!: ElementRef;
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef;
  @ViewChild('lottieInventory', { static: false }) lottieInventory!: ElementRef;
  @ViewChild('lottieHealth', { static: false }) lottieHealth!: ElementRef;
  @ViewChild('lottieWarehouse', { static: false }) lottieWarehouse!: ElementRef;
  @ViewChild('lottieOrders', { static: false }) lottieOrders!: ElementRef;
  @ViewChild('lowStockValue', { static: false }) lowStockValue!: ElementRef;
  @ViewChild('overstockValue', { static: false }) overstockValue!: ElementRef;
  @ViewChild('reorderValue', { static: false }) reorderValue!: ElementRef;

  selectedPeriod: '7D' | '30D' = '7D';
  currentSlide: number = 0;

  // Inventory Flow Data - 7 days
  flowData7D = {
    inbound: [520, 680, 450, 720, 580, 650, 750],
    outbound: [480, 620, 510, 690, 550, 720, 680],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  // Inventory Flow Data - 30 days (sample for last 7 visible days)
  flowData30D = {
    inbound: [580, 640, 520, 720, 680, 600, 740],
    outbound: [540, 600, 580, 680, 620, 640, 700],
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
  };

  topProducts = [
    { name: 'Smartphone X1', sku: 'SKU-2024', movement: 85, initials: 'SX' },
    { name: 'Laptop Pro 15', sku: 'SKU-2025', movement: 72, initials: 'LP' },
    { name: 'Wireless Headset', sku: 'SKU-2026', movement: 68, initials: 'WH' },
    { name: 'Tablet Max', sku: 'SKU-2027', movement: 65, initials: 'TM' },
    { name: 'Monitor Ultra', sku: 'SKU-2028', movement: 58, initials: 'MU' }
  ];

  activities = [
    { type: 'incoming', title: 'Shipment Received', details: 'Electronics - 500 units', time: '2 hours ago' },
    { type: 'outgoing', title: 'Order Fulfilled', details: 'Order #5678 - 200 units', time: '4 hours ago' },
    { type: 'transfer', title: 'Stock Transfer', details: 'WH-A to WH-B - 150 units', time: '6 hours ago' },
    { type: 'incoming', title: 'New Shipment', details: 'Clothing - 300 units', time: '8 hours ago' }
  ];

  recentShipments = [
    { orderId: 'ORD-2024-001', destination: 'New York Distribution Center', units: 1250, status: 'Delivered', date: '2 days ago' },
    { orderId: 'ORD-2024-002', destination: 'Los Angeles Warehouse', units: 850, status: 'In Transit', date: '1 day ago' },
    { orderId: 'ORD-2024-003', destination: 'Chicago Fulfillment', units: 620, status: 'In Transit', date: '3 days ago' },
    { orderId: 'ORD-2024-004', destination: 'Houston Hub', units: 1100, status: 'Pending', date: '5 days ago' }
  ];

  heatmapItems = Array.from({ length: 50 }, (_, i) => i + 1);
  calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Top Cities Data
  topCities = [
    { name: 'New York', value: 85 },
    { name: 'Los Angeles', value: 72 },
    { name: 'Chicago', value: 65 },
    { name: 'Houston', value: 58 },
    { name: 'Phoenix', value: 52 }
  ];

  // Inventory Turnaround Data
  turnaroundData = {
    inbound: [45, 52, 48, 60, 55, 58, 62, 65, 70, 68, 72, 75],
    outbound: [40, 45, 42, 50, 48, 52, 55, 58, 62, 60, 65, 68],
    transfer: [20, 22, 25, 28, 26, 30, 32, 35, 38, 36, 40, 42]
  };

  turnaroundLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  ngAfterViewInit(): void {
    if (this.pageContainer?.nativeElement) {
      useGsapIntro(this.pageContainer.nativeElement);
    }
    
    // Initialize scroll animations
    this.initScrollAnimations();
    
    setTimeout(() => {
      // Hero KPI Count-up animations
      if (this.kpiValue?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: 2450000,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            this.kpiValue.nativeElement.textContent = '$' + Math.round(obj.count).toLocaleString();
          }
        });
      }
      
      if (this.kpiHealth?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: 92,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            this.kpiHealth.nativeElement.textContent = Math.round(obj.count) + '%';
          }
        });
      }
      
      if (this.kpiWarehouses?.nativeElement) {
        useGsapCountUp(this.kpiWarehouses.nativeElement, 3);
      }
      
      if (this.kpiOrders?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: 1248,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            this.kpiOrders.nativeElement.textContent = Math.round(obj.count).toLocaleString();
          }
        });
      }
      
      // Stock Health Radar chart value animations
      if (this.lowStockValue?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: 30,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            this.lowStockValue.nativeElement.textContent = Math.round(obj.count) + '%';
          }
        });
      }
      
      if (this.overstockValue?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: 70,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            this.overstockValue.nativeElement.textContent = Math.round(obj.count) + '%';
          }
        });
      }
      
      if (this.reorderValue?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: 50,
          duration: 3,
          ease: 'power2.out',
          onUpdate: () => {
            this.reorderValue.nativeElement.textContent = Math.round(obj.count) + '%';
          }
        });
      }
      
      // Capacity bar animations
      if (this.capacityA?.nativeElement) {
        gsap.to(this.capacityA.nativeElement, { width: '92%', duration: 1.5, ease: 'power2.out', delay: 0.3 });
      }
      if (this.capacityB?.nativeElement) {
        gsap.to(this.capacityB.nativeElement, { width: '80%', duration: 1.5, ease: 'power2.out', delay: 0.4 });
      }
      if (this.capacityC?.nativeElement) {
        gsap.to(this.capacityC.nativeElement, { width: '50%', duration: 1.5, ease: 'power2.out', delay: 0.5 });
      }

      // Animate chart lines
      if (this.inboundLine?.nativeElement && this.outboundLine?.nativeElement) {
        const inboundPath = this.inboundLine.nativeElement;
        const outboundPath = this.outboundLine.nativeElement;
        
        // Get total length of paths
        const inboundLength = inboundPath.getTotalLength();
        const outboundLength = outboundPath.getTotalLength();
        
        // Set initial state
        gsap.set(inboundPath, { strokeDasharray: inboundLength, strokeDashoffset: inboundLength });
        gsap.set(outboundPath, { strokeDasharray: outboundLength, strokeDashoffset: outboundLength });
        
        // Animate drawing
        gsap.to(inboundPath, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          delay: 0.8
        });
        
        gsap.to(outboundPath, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          delay: 1
        });
      }

      // Initialize Lottie animations
      this.initLottieAnimations();
    }, 400);
  }

  initLottieAnimations(): void {
    setTimeout(() => {
      // Inventory Value Lottie - Money/Dollar animation
      if (this.lottieInventory?.nativeElement) {
        useLottieAnimation(
          this.lottieInventory.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json',
          { loop: true, autoplay: true }
        );
      }

      // Stock Health Lottie - Health/Checkmark animation
      if (this.lottieHealth?.nativeElement) {
        useLottieAnimation(
          this.lottieHealth.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_ukaaovrx.json',
          { loop: true, autoplay: true }
        );
      }

      // Warehouse Lottie - Warehouse/Building animation
      if (this.lottieWarehouse?.nativeElement) {
        useLottieAnimation(
          this.lottieWarehouse.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_qp1spzqv.json',
          { loop: true, autoplay: true }
        );
      }

      // Orders Lottie - Shopping/Order animation
      if (this.lottieOrders?.nativeElement) {
        useLottieAnimation(
          this.lottieOrders.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_qmfs6c3i.json',
          { loop: true, autoplay: true }
        );
      }
    }, 600);
  }

  // Get current flow data based on selected period
  getFlowData() {
    return this.selectedPeriod === '7D' ? this.flowData7D : this.flowData30D;
  }

  // Calculate SVG path for inbound area/line
  getInboundPath(lineOnly: boolean = false): string {
    const data = this.getFlowData();
    const width = 680;
    const height = 220;
    const padding = 60;
    const maxValue = 800;
    const dataPoints = data.inbound;
    
    const stepX = width / (dataPoints.length - 1);
    const points = dataPoints.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return { x, y };
    });
    
    if (lineOnly) {
      // Line path only
      return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    } else {
      // Area path (closed path)
      const firstX = points[0].x;
      const lastX = points[points.length - 1].x;
      const bottomY = padding + height;
      return `M ${firstX},${bottomY} L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${lastX},${bottomY} Z`;
    }
  }

  // Calculate SVG path for outbound area/line
  getOutboundPath(lineOnly: boolean = false): string {
    const data = this.getFlowData();
    const width = 680;
    const height = 220;
    const padding = 60;
    const maxValue = 800;
    const dataPoints = data.outbound;
    
    const stepX = width / (dataPoints.length - 1);
    const points = dataPoints.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return { x, y };
    });
    
    if (lineOnly) {
      // Line path only
      return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    } else {
      // Area path (closed path)
      const firstX = points[0].x;
      const lastX = points[points.length - 1].x;
      const bottomY = padding + height;
      return `M ${firstX},${bottomY} L ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${lastX},${bottomY} Z`;
    }
  }

  // Get points for inbound data markers
  getInboundPoints(): Array<{x: number, y: number, value: number}> {
    const data = this.getFlowData();
    const width = 680;
    const height = 220;
    const padding = 60;
    const maxValue = 800;
    const stepX = width / (data.inbound.length - 1);
    
    return data.inbound.map((value, index) => ({
      x: padding + (index * stepX),
      y: padding + height - (value / maxValue) * height,
      value
    }));
  }

  // Get points for outbound data markers
  getOutboundPoints(): Array<{x: number, y: number, value: number}> {
    const data = this.getFlowData();
    const width = 680;
    const height = 220;
    const padding = 60;
    const maxValue = 800;
    const stepX = width / (data.outbound.length - 1);
    
    return data.outbound.map((value, index) => ({
      x: padding + (index * stepX),
      y: padding + height - (value / maxValue) * height,
      value
    }));
  }

  // Get X-axis labels
  getXAxisLabels(): Array<{x: number, text: string}> {
    const data = this.getFlowData();
    const width = 680;
    const padding = 60;
    const stepX = width / (data.labels.length - 1);
    
    return data.labels.map((label, index) => ({
      x: padding + (index * stepX),
      text: label
    }));
  }

  // Calculate totals and changes
  getTotalInbound(): number {
    return this.getFlowData().inbound.reduce((sum, val) => sum + val, 0);
  }

  getTotalOutbound(): number {
    return this.getFlowData().outbound.reduce((sum, val) => sum + val, 0);
  }

  getNetFlow(): number {
    return this.getTotalInbound() - this.getTotalOutbound();
  }

  getInboundChange(): number {
    const data = this.getFlowData().inbound;
    const current = data.slice(-1)[0];
    const previous = data.slice(-2, -1)[0];
    return Math.round(((current - previous) / previous) * 100);
  }

  getOutboundChange(): string {
    const data = this.getFlowData().outbound;
    const current = data.slice(-1)[0];
    const previous = data.slice(-2, -1)[0];
    const change = Math.round(((current - previous) / previous) * 100);
    return change > 0 ? `+${change}` : `${change}`;
  }

  // Carousel methods
  get maxSlide(): number {
    const screenWidth = window.innerWidth;
    let itemsPerSlide = 1;
    if (screenWidth >= 1024) {
      itemsPerSlide = 3; // lg: 3 items
    } else if (screenWidth >= 768) {
      itemsPerSlide = 2; // md: 2 items
    }
    return Math.max(0, this.topProducts.length - itemsPerSlide);
  }

  get dotsArray(): number[] {
    const screenWidth = window.innerWidth;
    let itemsPerSlide = 1;
    if (screenWidth >= 1024) {
      itemsPerSlide = 3;
    } else if (screenWidth >= 768) {
      itemsPerSlide = 2;
    }
    const totalSlides = Math.ceil(this.topProducts.length / itemsPerSlide);
    return Array.from({ length: totalSlides }, (_, i) => i);
  }

  nextSlide(): void {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
      if (this.carouselTrack?.nativeElement) {
        gsap.to(this.carouselTrack.nativeElement, {
          x: `-${this.currentSlide * 100}%`,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    }
  }

  previousSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      if (this.carouselTrack?.nativeElement) {
        gsap.to(this.carouselTrack.nativeElement, {
          x: `-${this.currentSlide * 100}%`,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    if (this.carouselTrack?.nativeElement) {
      gsap.to(this.carouselTrack.nativeElement, {
        x: `-${this.currentSlide * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }

  // Top Cities Chart Methods
  getMaxCityValue(): number {
    return Math.max(...this.topCities.map(city => city.value));
  }

  // Inventory Turnaround Chart Methods
  getMaxTurnaroundValue(): number {
    const allValues = [...this.turnaroundData.inbound, ...this.turnaroundData.outbound, ...this.turnaroundData.transfer];
    return Math.max(...allValues) * 1.2; // 20% padding
  }

  getTurnaroundLinePath(type: 'inbound' | 'outbound' | 'transfer'): string {
    const data = this.turnaroundData[type];
    const maxValue = this.getMaxTurnaroundValue();
    const width = 620;
    const height = 240;
    const padding = 60;
    const stepX = width / (data.length - 1);
    
    const points = data.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M${points}`;
  }

  getTurnaroundAreaPath(type: 'inbound' | 'outbound' | 'transfer'): string {
    const data = this.turnaroundData[type];
    const maxValue = this.getMaxTurnaroundValue();
    const width = 620;
    const height = 240;
    const padding = 60;
    const stepX = width / (data.length - 1);
    const baseline = padding + height;
    
    const points = data.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    const firstX = padding;
    const lastX = padding + width;
    return `M${firstX},${baseline} L${points} L${lastX},${baseline} Z`;
  }

  getTurnaroundPoints(type: 'inbound' | 'outbound' | 'transfer'): Array<{x: number, y: number}> {
    const data = this.turnaroundData[type];
    const maxValue = this.getMaxTurnaroundValue();
    const width = 620;
    const height = 240;
    const padding = 60;
    const stepX = width / (data.length - 1);
    
    return data.map((value, index) => ({
      x: padding + (index * stepX),
      y: padding + height - (value / maxValue) * height
    }));
  }

  private observer: IntersectionObserver | null = null;

  initScrollAnimations(): void {
    // Wait for DOM to be ready
    setTimeout(() => {
      const sections = this.pageContainer?.nativeElement?.querySelectorAll('section');
      if (!sections || sections.length === 0) return;

      // Create Intersection Observer
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add('animate-in-view');
              // Stop observing once animated
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px'
        }
      );

      // Observe all sections (skip first one - Hero KPI)
      Array.from(sections).forEach((section, index) => {
        if (index > 0) {
          const sectionEl = section as HTMLElement;
          sectionEl.classList.add('scroll-animate');
          this.observer?.observe(sectionEl);
        }
      });
    }, 200);
  }

  ngOnDestroy(): void {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
