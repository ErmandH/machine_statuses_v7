import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DeviceGuard } from './guards/device.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [DeviceGuard]
  },
  {
    path: 'device-select',
    loadChildren: () => import('./device-select/device-select.module').then( m => m.DeviceSelectPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'area-info',
    loadChildren: () => import('./area-info/area-info.module').then( m => m.AreaInfoPageModule),
    canActivate: [DeviceGuard]
  },
  {
    path: 'working-statistics',
    loadChildren: () => import('./working-statistics/working-statistics.module').then( m => m.WorkingStatisticsPageModule),
    canActivate: [DeviceGuard]
  },
  {
    path: 'seed-calibration',
    loadChildren: () => import('./seed-calibration/seed-calibration.module').then( m => m.SeedCalibrationPageModule),
    canActivate: [DeviceGuard]
  },
  {
    path: 'fertilizer-calibration',
    loadChildren: () => import('./fertilizer-calibration/fertilizer-calibration.module').then( m => m.FertilizerCalibrationPageModule),
    canActivate: [DeviceGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [DeviceGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
