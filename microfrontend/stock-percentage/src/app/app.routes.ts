import { Routes } from '@angular/router';
import { TrackStock } from './component/track-stock/track-stock';
import { Dashboard } from './component/dashboard/dashboard';

export const routes: Routes = [
    {
        path: "track-stock",
        component: TrackStock
    },
    {
        path: "dashboard",
        component: Dashboard
    }
];
