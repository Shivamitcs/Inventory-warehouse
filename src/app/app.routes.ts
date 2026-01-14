import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { animation: 'dashboard' }
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    data: { animation: 'products' }
  },
  {
    path: 'suppliers',
    loadComponent: () => import('./pages/suppliers/suppliers.component').then(m => m.SuppliersComponent),
    data: { animation: 'suppliers' }
  },
  {
    path: 'alerts',
    loadComponent: () => import('./pages/alerts/alerts.component').then(m => m.AlertsComponent),
    data: { animation: 'alerts' }
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    data: { animation: 'settings' }
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];