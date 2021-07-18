import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisterDexComponent } from './pages/mister-dex/mister-dex.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { AppAboutComponent } from './pages/app-about/app-about.component';
import { AppDetailsComponent } from './pages/app-details/app-details.component';
import { PokemonResolverService } from './services/pokemon-resolver.service';

const routes: Routes = [
  {
    path: 'poke/:name', component: AppDetailsComponent, 
    resolve:{
      poke: PokemonResolverService
    }
},
  {path: 'poke', component: MisterDexComponent},
  {path: 'about', component: AppAboutComponent},
  {path: 'home', component: AppHomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
