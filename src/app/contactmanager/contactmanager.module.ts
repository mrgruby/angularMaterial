import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {path: 'contactmanager', loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule)},
  {path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)},
  {path: '**', redirectTo: 'contactmanager'}//Catch-All route
]

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ]
})
export class ContactmanagerModule { }
