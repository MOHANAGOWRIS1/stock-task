import { Routes } from '@angular/router';
import { TrackStock } from './component/track-stock/track-stock';
import { Dashboard } from './component/dashboard/dashboard';

import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
   {
    path: 'stock-price',
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'stock-price',
        exposedModule: './Component',
      }).then(m => m.App)   // 👈 reference the exported class from app.ts
  },
    {
        path: "track-stock",
        component: TrackStock
    },
    {
        path: "dashboard",
        component: Dashboard
    }
];
