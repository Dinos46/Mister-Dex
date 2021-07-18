import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/store';
import { AppEffects } from './store/app.effects';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './root-component';
import { MisterDexComponent } from './pages/mister-dex/mister-dex.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { AppDetailsComponent } from './pages/app-details/app-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppAboutComponent } from './pages/app-about/app-about.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component';
import { AppListComponent } from './cmps/app-list/app-list.component';
import { AppPreviewComponent } from './cmps/app-preview/app-preview.component';
import { AppFilterComponent } from './cmps/app-filter/app-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    MisterDexComponent,
    AppHomeComponent,
    AppListComponent,
    AppPreviewComponent,
    AppDetailsComponent,
    AppAboutComponent,
    AppFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
