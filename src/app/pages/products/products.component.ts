import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fadeIn } from '../../core/utils/animations';
import { useGsapIntro } from '../../core/hooks/gsap.hook';
import { useLottieAnimation } from '../../core/hooks/lottie.hook';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image: string;
  location: string;
  lastUpdated: string;
  minStock: number;
  maxStock: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [fadeIn],
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageContainer', { static: false }) pageContainer!: ElementRef;
  @ViewChild('lottieTotal', { static: false }) lottieTotal!: ElementRef;
  @ViewChild('lottieInStock', { static: false }) lottieInStock!: ElementRef;
  @ViewChild('lottieLowStock', { static: false }) lottieLowStock!: ElementRef;
  @ViewChild('lottieOutOfStock', { static: false }) lottieOutOfStock!: ElementRef;
  
  searchQuery = '';
  selectedCategory = '';
  selectedStatus = '';
  filteredProducts: Product[] = [];
  private observer: IntersectionObserver | null = null;

  products: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      sku: 'WH-2024-001',
      category: 'Electronics',
      stock: 245,
      price: 129.99,
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse A',
      lastUpdated: '2 days ago',
      minStock: 50,
      maxStock: 500
    },
    {
      id: '2',
      name: 'Premium Laptop Pro 15"',
      sku: 'LT-2024-002',
      category: 'Electronics',
      stock: 38,
      price: 2499.99,
      status: 'low-stock',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse A',
      lastUpdated: '1 day ago',
      minStock: 50,
      maxStock: 200
    },
    {
      id: '3',
      name: 'Smart Watch Series 9',
      sku: 'SW-2024-003',
      category: 'Electronics',
      stock: 0,
      price: 399.99,
      status: 'out-of-stock',
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse B',
      lastUpdated: '5 days ago',
      minStock: 30,
      maxStock: 150
    },
    {
      id: '4',
      name: 'Cotton T-Shirt (Pack of 5)',
      sku: 'TS-2024-004',
      category: 'Clothing',
      stock: 567,
      price: 45.99,
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse C',
      lastUpdated: '3 days ago',
      minStock: 100,
      maxStock: 1000
    },
    {
      id: '5',
      name: 'Stainless Steel Water Bottle',
      sku: 'WB-2024-005',
      category: 'Accessories',
      stock: 892,
      price: 24.99,
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse A',
      lastUpdated: '1 day ago',
      minStock: 200,
      maxStock: 1200
    },
    {
      id: '6',
      name: 'Gaming Mouse RGB',
      sku: 'GM-2024-006',
      category: 'Electronics',
      stock: 42,
      price: 79.99,
      status: 'low-stock',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
      location: 'Warehouse B',
      lastUpdated: '4 days ago',
      minStock: 50,
      maxStock: 300
    },
    {
      id: '7',
      name: 'Organic Coffee Beans (2lb)',
      sku: 'CF-2024-007',
      category: 'Food & Beverage',
      stock: 234,
      price: 18.99,
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse C',
      lastUpdated: '2 days ago',
      minStock: 150,
      maxStock: 800
    },
    {
      id: '8',
      name: 'Leather Wallet Genuine',
      sku: 'LW-2024-008',
      category: 'Accessories',
      stock: 0,
      price: 89.99,
      status: 'out-of-stock',
      image: 'https://images.pexels.com/photos/932261/pexels-photo-932261.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse A',
      lastUpdated: '6 days ago',
      minStock: 25,
      maxStock: 200
    },
    {
      id: '9',
      name: 'Mechanical Keyboard Pro',
      sku: 'KB-2024-009',
      category: 'Electronics',
      stock: 156,
      price: 149.99,
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse B',
      lastUpdated: '1 day ago',
      minStock: 75,
      maxStock: 400
    },
    {
      id: '10',
      name: 'Yoga Mat Premium',
      sku: 'YM-2024-010',
      category: 'Fitness',
      stock: 28,
      price: 34.99,
      status: 'low-stock',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse C',
      lastUpdated: '3 days ago',
      minStock: 40,
      maxStock: 250
    },
    {
      id: '11',
      name: 'Wireless Charging Pad',
      sku: 'WC-2024-011',
      category: 'Electronics',
      stock: 178,
      price: 29.99,
      status: 'in-stock',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Warehouse A',
      lastUpdated: '2 days ago',
      minStock: 100,
      maxStock: 500
    },
    {
      id: '12',
      name: 'Bamboo Cutting Board Set',
      sku: 'BC-2024-012',
      category: 'Home & Kitchen',
      stock: 95,
      price: 42.99,
      status: 'in-stock',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=800&fit=crop',
      location: 'Warehouse B',
      lastUpdated: '1 day ago',
      minStock: 50,
      maxStock: 300
    }
  ];

  get categories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  ngAfterViewInit(): void {
    this.filteredProducts = [...this.products];
    
    if (this.pageContainer?.nativeElement) {
      useGsapIntro(this.pageContainer.nativeElement);
    }
    
    this.initScrollAnimations();
    this.initLottieAnimations();
  }

  initLottieAnimations(): void {
    setTimeout(() => {
      // Total Products Lottie - Box/Inventory animation
      if (this.lottieTotal?.nativeElement) {
        useLottieAnimation(
          this.lottieTotal.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json',
          { loop: true, autoplay: true }
        );
      }

      // In Stock Lottie - Checkmark/Success animation
      if (this.lottieInStock?.nativeElement) {
        useLottieAnimation(
          this.lottieInStock.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_ukaaovrx.json',
          { loop: true, autoplay: true }
        );
      }

      // Low Stock Lottie - Warning/Alert animation
      if (this.lottieLowStock?.nativeElement) {
        useLottieAnimation(
          this.lottieLowStock.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_qp1spzqv.json',
          { loop: true, autoplay: true }
        );
      }

      // Out of Stock Lottie - Error/Stop animation
      if (this.lottieOutOfStock?.nativeElement) {
        useLottieAnimation(
          this.lottieOutOfStock.nativeElement,
          'https://assets5.lottiefiles.com/packages/lf20_qmfs6c3i.json',
          { loop: true, autoplay: true }
        );
      }
    }, 600);
  }

  initScrollAnimations(): void {
    setTimeout(() => {
      const elements = this.pageContainer?.nativeElement?.querySelectorAll('.scroll-animate');
      if (!elements || elements.length === 0) return;

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

      Array.from(elements).forEach((element) => {
        this.observer?.observe(element as Element);
      });
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || product.status === this.selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  getInStockCount(): number {
    return this.products.filter(p => p.status === 'in-stock').length;
  }

  getLowStockCount(): number {
    return this.products.filter(p => p.status === 'low-stock').length;
  }

  getOutOfStockCount(): number {
    return this.products.filter(p => p.status === 'out-of-stock').length;
  }

  getStockPercentage(product: Product): number {
    return (product.stock / product.maxStock) * 100;
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}