import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeIn, slideUp } from '../../core/utils/animations';
import { useGsapIntro, useGsapCountUp, useGsapStagger } from '../../core/hooks/gsap.hook';
import { useLottieAnimation } from '../../core/hooks/lottie.hook';
import { gsap } from 'gsap';

interface Supplier {
  id: number;
  name: string;
  category: string;
  logo: string;
  initials: string;
  reliabilityScore: number;
  onTimeDelivery: number;
  avgDeliveryTime: number;
  activeContracts: number;
  status: 'Preferred' | 'Standard' | 'At Risk' | 'Blacklisted';
  totalOrders: number;
  fulfillmentRate: number;
  returnRate: number;
  disputeRate: number;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  riskLevel: 'Low' | 'Medium' | 'High';
  lastOrderDate: string;
  contractExpiry?: string;
  totalRevenue?: number;
}

interface ActivityEvent {
  type: 'order' | 'delay' | 'price' | 'contract';
  supplier: string;
  title: string;
  details: string;
  timestamp: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule],
  animations: [fadeIn, slideUp],
  templateUrl: './suppliers.component.html',
  styles: []
})
export class SuppliersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageContainer', { static: false }) pageContainer!: ElementRef;
  @ViewChild('kpiSuppliers', { static: false }) kpiSuppliers!: ElementRef;
  @ViewChild('kpiOnTime', { static: false }) kpiOnTime!: ElementRef;
  @ViewChild('kpiFulfillment', { static: false }) kpiFulfillment!: ElementRef;
  @ViewChild('kpiRisk', { static: false }) kpiRisk!: ElementRef;
  @ViewChild('lottieSuppliers', { static: false }) lottieSuppliers!: ElementRef;
  @ViewChild('lottieOnTime', { static: false }) lottieOnTime!: ElementRef;
  @ViewChild('lottieFulfillment', { static: false }) lottieFulfillment!: ElementRef;
  @ViewChild('lottieRisk', { static: false }) lottieRisk!: ElementRef;

  selectedSegment: 'Preferred' | 'Standard' | 'At Risk' | 'Blacklisted' | 'All' = 'All';

  suppliers: Supplier[] = [
    {
      id: 1,
      name: 'TechGlobal Solutions',
      category: 'Electronics',
      logo: '',
      initials: 'TG',
      reliabilityScore: 95,
      onTimeDelivery: 98,
      avgDeliveryTime: 3.2,
      activeContracts: 5,
      status: 'Preferred',
      totalOrders: 1248,
      fulfillmentRate: 96,
      returnRate: 0.8,
      disputeRate: 0.2,
      contact: {
        email: 'contact@techglobal.com',
        phone: '+1 (555) 234-5678',
        address: 'San Francisco, CA'
      },
      riskLevel: 'Low',
      lastOrderDate: '2 days ago',
      contractExpiry: '2025-12-31',
      totalRevenue: 1250000
    },
    {
      id: 2,
      name: 'Premium Logistics Inc',
      category: 'Logistics',
      logo: '',
      initials: 'PL',
      reliabilityScore: 92,
      onTimeDelivery: 94,
      avgDeliveryTime: 2.8,
      activeContracts: 3,
      status: 'Preferred',
      totalOrders: 892,
      fulfillmentRate: 93,
      returnRate: 1.2,
      disputeRate: 0.5,
      contact: {
        email: 'info@premiumlogistics.com',
        phone: '+1 (555) 345-6789',
        address: 'Chicago, IL'
      },
      riskLevel: 'Low',
      lastOrderDate: '1 day ago',
      contractExpiry: '2025-06-30',
      totalRevenue: 890000
    },
    {
      id: 3,
      name: 'Metro Manufacturing',
      category: 'Manufacturing',
      logo: '',
      initials: 'MM',
      reliabilityScore: 88,
      onTimeDelivery: 87,
      avgDeliveryTime: 4.5,
      activeContracts: 4,
      status: 'Standard',
      totalOrders: 654,
      fulfillmentRate: 89,
      returnRate: 2.1,
      disputeRate: 1.1,
      contact: {
        email: 'sales@metroman.com',
        phone: '+1 (555) 456-7890',
        address: 'Houston, TX'
      },
      riskLevel: 'Medium',
      lastOrderDate: '3 days ago',
      contractExpiry: '2024-12-15',
      totalRevenue: 654000
    },
    {
      id: 4,
      name: 'Global Supply Chain',
      category: 'Wholesale',
      logo: '',
      initials: 'GS',
      reliabilityScore: 85,
      onTimeDelivery: 82,
      avgDeliveryTime: 5.2,
      activeContracts: 2,
      status: 'Standard',
      totalOrders: 421,
      fulfillmentRate: 84,
      returnRate: 2.8,
      disputeRate: 1.5,
      contact: {
        email: 'hello@globalsupply.com',
        phone: '+1 (555) 567-8901',
        address: 'New York, NY'
      },
      riskLevel: 'Medium',
      lastOrderDate: '5 days ago',
      contractExpiry: '2025-03-20',
      totalRevenue: 421000
    },
    {
      id: 5,
      name: 'Oceanic Trading Group',
      category: 'Import/Export',
      logo: '',
      initials: 'OT',
      reliabilityScore: 72,
      onTimeDelivery: 68,
      avgDeliveryTime: 8.5,
      activeContracts: 1,
      status: 'At Risk',
      totalOrders: 234,
      fulfillmentRate: 71,
      returnRate: 4.2,
      disputeRate: 3.1,
      contact: {
        email: 'trade@oceanic.com',
        phone: '+1 (555) 678-9012',
        address: 'Los Angeles, CA'
      },
      riskLevel: 'High',
      lastOrderDate: '12 days ago',
      contractExpiry: '2024-11-30',
      totalRevenue: 234000
    },
    {
      id: 6,
      name: 'Elite Components Ltd',
      category: 'Electronics',
      logo: '',
      initials: 'EC',
      reliabilityScore: 91,
      onTimeDelivery: 93,
      avgDeliveryTime: 3.5,
      activeContracts: 6,
      status: 'Preferred',
      totalOrders: 1056,
      fulfillmentRate: 94,
      returnRate: 0.9,
      disputeRate: 0.3,
      contact: {
        email: 'support@elitecomp.com',
        phone: '+1 (555) 789-0123',
        address: 'Seattle, WA'
      },
      riskLevel: 'Low',
      lastOrderDate: '1 day ago',
      contractExpiry: '2026-01-15',
      totalRevenue: 1056000
    },
    {
      id: 7,
      name: 'Apex Distribution',
      category: 'Distribution',
      logo: '',
      initials: 'AD',
      reliabilityScore: 78,
      onTimeDelivery: 75,
      avgDeliveryTime: 6.8,
      activeContracts: 2,
      status: 'At Risk',
      totalOrders: 389,
      fulfillmentRate: 77,
      returnRate: 3.5,
      disputeRate: 2.8,
      contact: {
        email: 'contact@apexdist.com',
        phone: '+1 (555) 890-1234',
        address: 'Phoenix, AZ'
      },
      riskLevel: 'High',
      lastOrderDate: '8 days ago',
      contractExpiry: '2024-10-25',
      totalRevenue: 389000
    },
    {
      id: 8,
      name: 'Prime Materials Corp',
      category: 'Raw Materials',
      logo: '',
      initials: 'PM',
      reliabilityScore: 89,
      onTimeDelivery: 91,
      avgDeliveryTime: 4.2,
      activeContracts: 3,
      status: 'Standard',
      totalOrders: 567,
      fulfillmentRate: 90,
      returnRate: 1.8,
      disputeRate: 0.9,
      contact: {
        email: 'info@primematerials.com',
        phone: '+1 (555) 901-2345',
        address: 'Denver, CO'
      },
      riskLevel: 'Low',
      lastOrderDate: '4 days ago',
      contractExpiry: '2025-09-10',
      totalRevenue: 567000
    },
    {
      id: 9,
      name: 'Falcon Industrial Supply',
      category: 'Industrial',
      logo: '',
      initials: 'FI',
      reliabilityScore: 65,
      onTimeDelivery: 58,
      avgDeliveryTime: 12.5,
      activeContracts: 1,
      status: 'Blacklisted',
      totalOrders: 123,
      fulfillmentRate: 62,
      returnRate: 6.8,
      disputeRate: 5.2,
      contact: {
        email: 'sales@falconind.com',
        phone: '+1 (555) 012-3456',
        address: 'Dallas, TX'
      },
      riskLevel: 'High',
      lastOrderDate: '45 days ago',
      contractExpiry: '2024-09-30',
      totalRevenue: 123000
    },
    {
      id: 10,
      name: 'Summit Electronics Group',
      category: 'Electronics',
      logo: '',
      initials: 'SE',
      reliabilityScore: 94,
      onTimeDelivery: 96,
      avgDeliveryTime: 2.5,
      activeContracts: 4,
      status: 'Preferred',
      totalOrders: 987,
      fulfillmentRate: 95,
      returnRate: 0.7,
      disputeRate: 0.1,
      contact: {
        email: 'hello@summitelec.com',
        phone: '+1 (555) 123-4567',
        address: 'Boston, MA'
      },
      riskLevel: 'Low',
      lastOrderDate: '1 day ago',
      contractExpiry: '2025-11-20',
      totalRevenue: 987000
    },
    {
      id: 11,
      name: 'Pacific Rim Trading',
      category: 'Import/Export',
      logo: '',
      initials: 'PR',
      reliabilityScore: 86,
      onTimeDelivery: 88,
      avgDeliveryTime: 5.8,
      activeContracts: 2,
      status: 'Standard',
      totalOrders: 445,
      fulfillmentRate: 87,
      returnRate: 2.2,
      disputeRate: 1.2,
      contact: {
        email: 'info@pacificrim.com',
        phone: '+1 (555) 234-7890',
        address: 'Portland, OR'
      },
      riskLevel: 'Medium',
      lastOrderDate: '6 days ago',
      contractExpiry: '2025-05-15',
      totalRevenue: 445000
    },
    {
      id: 12,
      name: 'NexGen Materials',
      category: 'Raw Materials',
      logo: '',
      initials: 'NG',
      reliabilityScore: 90,
      onTimeDelivery: 92,
      avgDeliveryTime: 3.8,
      activeContracts: 3,
      status: 'Preferred',
      totalOrders: 723,
      fulfillmentRate: 91,
      returnRate: 1.1,
      disputeRate: 0.6,
      contact: {
        email: 'sales@nexgenmaterials.com',
        phone: '+1 (555) 345-8901',
        address: 'Austin, TX'
      },
      riskLevel: 'Low',
      lastOrderDate: '2 days ago',
      contractExpiry: '2025-08-30',
      totalRevenue: 723000
    }
  ];

  activities: ActivityEvent[] = [
    {
      type: 'order',
      supplier: 'TechGlobal Solutions',
      title: 'Purchase Order Placed',
      details: 'Order #PO-2024-0842 - $125,000',
      timestamp: '2 hours ago',
      icon: '📦',
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      type: 'delay',
      supplier: 'Oceanic Trading Group',
      title: 'Delivery Delay Reported',
      details: 'Order #PO-2024-0721 delayed by 3 days',
      timestamp: '5 hours ago',
      icon: '⚠️',
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      type: 'price',
      supplier: 'Premium Logistics Inc',
      title: 'Price Update Received',
      details: 'Updated pricing for Q4 2024 catalog',
      timestamp: '1 day ago',
      icon: '💰',
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      type: 'contract',
      supplier: 'Elite Components Ltd',
      title: 'Contract Renewed',
      details: 'Annual contract extended through 2025',
      timestamp: '2 days ago',
      icon: '📄',
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      type: 'order',
      supplier: 'Summit Electronics Group',
      title: 'Purchase Order Placed',
      details: 'Order #PO-2024-0843 - $85,500',
      timestamp: '3 days ago',
      icon: '📦',
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      type: 'delay',
      supplier: 'Apex Distribution',
      title: 'Delivery Delay Reported',
      details: 'Order #PO-2024-0681 delayed by 5 days',
      timestamp: '4 days ago',
      icon: '⚠️',
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      type: 'price',
      supplier: 'Metro Manufacturing Co',
      title: 'Price Update Received',
      details: 'New pricing tier for bulk orders',
      timestamp: '5 days ago',
      icon: '💰',
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      type: 'contract',
      supplier: 'Prime Materials Corp',
      title: 'Contract Review Scheduled',
      details: 'Annual review meeting set for next week',
      timestamp: '6 days ago',
      icon: '📄',
      color: 'text-purple-500 bg-purple-500/10'
    }
  ];

  // Performance Analytics Data
  deliveryTrendData = [85, 87, 89, 91, 88, 90, 92, 93, 91, 94, 96, 95];
  fulfillmentRateData = [88, 90, 89, 92, 91, 93, 94, 93, 92, 94, 95, 94];
  returnRateData = [2.5, 2.3, 2.1, 1.9, 2.0, 1.8, 1.7, 1.6, 1.8, 1.5, 1.4, 1.3];
  disputeRateData = [1.2, 1.1, 1.0, 0.9, 1.0, 0.8, 0.9, 0.7, 0.8, 0.6, 0.5, 0.4];

  private observer: IntersectionObserver | null = null;

  get filteredSuppliers(): Supplier[] {
    if (this.selectedSegment === 'All') {
      return this.suppliers;
    }
    return this.suppliers.filter(s => s.status === this.selectedSegment);
  }

  get totalActiveSuppliers(): number {
    return this.suppliers.filter(s => s.status !== 'Blacklisted').length;
  }

  get avgOnTimeDelivery(): number {
    const active = this.suppliers.filter(s => s.status !== 'Blacklisted');
    return Math.round(active.reduce((sum, s) => sum + s.onTimeDelivery, 0) / active.length);
  }

  get avgFulfillmentTime(): number {
    const active = this.suppliers.filter(s => s.status !== 'Blacklisted');
    return Number((active.reduce((sum, s) => sum + s.avgDeliveryTime, 0) / active.length).toFixed(1));
  }

  get avgReturnRate(): number {
    const active = this.suppliers.filter(s => s.status !== 'Blacklisted');
    return Number((active.reduce((sum, s) => sum + s.returnRate, 0) / active.length).toFixed(2));
  }

  get avgDisputeRate(): number {
    const active = this.suppliers.filter(s => s.status !== 'Blacklisted');
    return Number((active.reduce((sum, s) => sum + s.disputeRate, 0) / active.length).toFixed(2));
  }

  get expiringContracts(): number {
    const today = new Date();
    const thirtyDays = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return this.suppliers.filter(s => {
      if (!s.contractExpiry) return false;
      const expiry = new Date(s.contractExpiry);
      return expiry <= thirtyDays && expiry > today;
    }).length;
  }

  get lowRiskCount(): number {
    return this.suppliers.filter(s => s.riskLevel === 'Low').length;
  }

  get mediumRiskCount(): number {
    return this.suppliers.filter(s => s.riskLevel === 'Medium').length;
  }

  get highRiskCount(): number {
    return this.suppliers.filter(s => s.riskLevel === 'High').length;
  }

  get lowRiskPercentage(): number {
    return (this.lowRiskCount / this.suppliers.length) * 100;
  }

  get mediumRiskPercentage(): number {
    return (this.mediumRiskCount / this.suppliers.length) * 100;
  }

  get highRiskPercentage(): number {
    return (this.highRiskCount / this.suppliers.length) * 100;
  }

  get totalActiveContracts(): number {
    return this.suppliers.reduce((sum, s) => sum + s.activeContracts, 0);
  }

  get suppliersWithContracts(): number {
    return this.suppliers.filter(s => s.contractExpiry).length;
  }

  get renewalsDue(): number {
    return this.suppliersWithContracts - this.expiringContracts;
  }

  selectSegment(segment: string): void {
    // Relaxed type for template; cast back to union internally
    this.selectedSegment = segment as 'Preferred' | 'Standard' | 'At Risk' | 'Blacklisted' | 'All';
    // Animate segment switch
    const cards = this.pageContainer?.nativeElement?.querySelectorAll('.supplier-card');
    if (cards) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }

  getReliabilityColor(score: number): string {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  }

  getReliabilityBgColor(score: number): string {
    if (score >= 90) return 'bg-emerald-500/20';
    if (score >= 75) return 'bg-blue-500/20';
    if (score >= 60) return 'bg-amber-500/20';
    return 'bg-red-500/20';
  }

  getStatusColor(status: Supplier['status']): string {
    switch (status) {
      case 'Preferred': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      case 'Standard': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'At Risk': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'Blacklisted': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  }

  getStatusDotColor(status: Supplier['status']): string {
    switch (status) {
      case 'Preferred': return 'bg-emerald-500';
      case 'Standard': return 'bg-blue-500';
      case 'At Risk': return 'bg-amber-500';
      case 'Blacklisted': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  getStatusTooltipColor(status: Supplier['status']): string {
    switch (status) {
      case 'Preferred': return 'bg-emerald-600';
      case 'Standard': return 'bg-blue-600';
      case 'At Risk': return 'bg-amber-600';
      case 'Blacklisted': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  }

  getRiskLevelColor(level: Supplier['riskLevel']): string {
    switch (level) {
      case 'Low': return 'text-emerald-500 bg-emerald-500/10';
      case 'Medium': return 'text-amber-500 bg-amber-500/10';
      case 'High': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  }

  // Chart helper methods
  getDeliveryTrendPath(): string {
    const width = 580;
    const height = 180;
    const padding = 40;
    const maxValue = 100;
    const stepX = width / (this.deliveryTrendData.length - 1);
    
    const points = this.deliveryTrendData.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M${points}`;
  }

  getDeliveryTrendAreaPath(): string {
    const width = 580;
    const height = 180;
    const padding = 40;
    const maxValue = 100;
    const stepX = width / (this.deliveryTrendData.length - 1);
    const baseline = padding + height;
    
    const points = this.deliveryTrendData.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    const firstX = padding;
    const lastX = padding + width;
    return `M${firstX},${baseline} L${points} L${lastX},${baseline} Z`;
  }

  getReturnRatePath(): string {
    const width = 560;
    const height = 160;
    const padding = 40;
    const maxValue = 8;
    const stepX = width / (this.returnRateData.length - 1);
    
    const points = this.returnRateData.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M${points}`;
  }

  getDisputeRatePath(): string {
    const width = 560;
    const height = 160;
    const padding = 40;
    const maxValue = 2;
    const stepX = width / (this.disputeRateData.length - 1);
    
    const points = this.disputeRateData.map((value, index) => {
      const x = padding + (index * stepX);
      const y = padding + height - (value / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M${points}`;
  }

  ngAfterViewInit(): void {
    if (this.pageContainer?.nativeElement) {
      useGsapIntro(this.pageContainer.nativeElement);
    }
    
    this.initScrollAnimations();
    this.initCardAnimations();
    this.initProgressRings();
    
    setTimeout(() => {
      // KPI Count-up animations
      if (this.kpiSuppliers?.nativeElement) {
        useGsapCountUp(this.kpiSuppliers.nativeElement, this.totalActiveSuppliers);
      }
      
      if (this.kpiOnTime?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: this.avgOnTimeDelivery,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            this.kpiOnTime.nativeElement.textContent = Math.round(obj.count) + '%';
          }
        });
      }
      
      if (this.kpiFulfillment?.nativeElement) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: this.avgFulfillmentTime,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            this.kpiFulfillment.nativeElement.textContent = obj.count.toFixed(1) + ' days';
          }
        });
      }
      
      if (this.kpiRisk?.nativeElement) {
        useGsapCountUp(this.kpiRisk.nativeElement, this.highRiskCount);
      }

      // Initialize Lottie animations
      this.initLottieAnimations();
    }, 400);
  }

  initLottieAnimations(): void {
    setTimeout(() => {
      // Total Suppliers Lottie - Network/People animation
      if (this.lottieSuppliers?.nativeElement) {
        useLottieAnimation(
          this.lottieSuppliers.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json',
          { loop: true, autoplay: true }
        );
      }

      // On-Time Delivery Lottie - Clock/Time animation
      if (this.lottieOnTime?.nativeElement) {
        useLottieAnimation(
          this.lottieOnTime.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_ukaaovrx.json',
          { loop: true, autoplay: true }
        );
      }

      // Fulfillment Time Lottie - Delivery/Truck animation
      if (this.lottieFulfillment?.nativeElement) {
        useLottieAnimation(
          this.lottieFulfillment.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_qp1spzqv.json',
          { loop: true, autoplay: true }
        );
      }

      // Risk Level Lottie - Warning/Alert animation
      if (this.lottieRisk?.nativeElement) {
        useLottieAnimation(
          this.lottieRisk.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_qmfs6c3i.json',
          { loop: true, autoplay: true }
        );
      }
    }, 600);
  }

  initCardAnimations(): void {
    setTimeout(() => {
      const cards = this.pageContainer?.nativeElement?.querySelectorAll('.supplier-card');
      if (cards && cards.length > 0) {
        const cardElements = Array.from(cards) as HTMLElement[];
        // Animate all cards with stagger, ensuring they all animate properly
        gsap.fromTo(cardElements, 
          { 
            opacity: 0, 
            y: 30, 
            scale: 0.95 
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      }
    }, 800);
  }

  initProgressRings(): void {
    setTimeout(() => {
      const rings = this.pageContainer?.nativeElement?.querySelectorAll('.progress-ring');
      rings?.forEach((ring: HTMLElement) => {
        const score = parseInt(ring.getAttribute('data-score') || '0');
        const circumference = 2 * Math.PI * 28; // radius = 28
        const offset = circumference * (1 - score / 100);
        
        gsap.fromTo(ring, 
          { strokeDashoffset: circumference },
          { 
            strokeDashoffset: offset, 
            duration: 2, 
            ease: 'power2.out',
            delay: 0.5
          }
        );
      });
    }, 800);
  }

  initScrollAnimations(): void {
    setTimeout(() => {
      const sections = this.pageContainer?.nativeElement?.querySelectorAll('section');
      if (!sections || sections.length === 0) return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add('animate-in-view');
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px'
        }
      );

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
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
