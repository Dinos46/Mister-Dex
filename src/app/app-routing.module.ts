import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisterDexComponent } from './pages/mister-dex/mister-dex.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';

const routes: Routes = [
  {path: 'poke', component: MisterDexComponent},
  {path: 'home', component: AppHomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
