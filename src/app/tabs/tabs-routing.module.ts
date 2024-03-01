import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'settings-tab1',
        loadChildren: () => import('../settings-tab1/settings-tab1.module').then(m => m.SettingsTab1PageModule)
      },
      {
        path: 'settings-tab2',
        loadChildren: () => import('../settings-tab2/settings-tab2.module').then(m => m.SettingsTab2PageModule)
      },
      {
        path: 'settings-tab3',
        loadChildren: () => import('../settings-tab3/settings-tab3.module').then(m => m.SettingsTab3PageModule)
      },
      {
        path: 'settings-tab4',
        loadChildren: () => import('../settings-tab4/settings-tab4.module').then(m => m.SettingsTab4PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/settings-tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/settings-tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
