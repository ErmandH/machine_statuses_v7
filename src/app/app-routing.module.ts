import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    loadChildren: () => import('./area-info/area-info.module').then( m => m.AreaInfoPageModule)
  },
  {
    path: 'working-statistics',
    loadChildren: () => import('./working-statistics/working-statistics.module').then( m => m.WorkingStatisticsPageModule)
  },
  // {
  //   path: 'settings-tab1',
  //   loadChildren: () => import('./settings-tab1/settings-tab1.module').then( m => m.SettingsTab1PageModule)
  // },
  // {
  //   path: 'settings-tab2',
  //   loadChildren: () => import('./settings-tab2/settings-tab2.module').then( m => m.SettingsTab2PageModule)
  // },
  // {
  //   path: 'settings-tab3',
  //   loadChildren: () => import('./settings-tab3/settings-tab3.module').then( m => m.SettingsTab3PageModule)
  // },
  // {
  //   path: 'settings-tab4',
  //   loadChildren: () => import('./settings-tab4/settings-tab4.module').then( m => m.SettingsTab4PageModule)
  // },
  {
    path: 'seed-calibration',
    loadChildren: () => import('./seed-calibration/seed-calibration.module').then( m => m.SeedCalibrationPageModule)
  },
  {
    path: 'fertilizer-calibration',
    loadChildren: () => import('./fertilizer-calibration/fertilizer-calibration.module').then( m => m.FertilizerCalibrationPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
