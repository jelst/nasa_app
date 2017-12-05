import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {AuthguardGuard} from './authguard.guard';
import {UserService} from './user.service';
import { AboutPageComponent } from './about-page/about-page.component';
import { CollectionComponent } from './collection/collection.component';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'about-page',
    component: AboutPageComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    DashboardComponent,
    AboutPageComponent,
    CollectionComponent
  ],
  imports: [
  RouterModule.forRoot(appRoutes),
  BrowserModule
  ],
  providers: [UserService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }