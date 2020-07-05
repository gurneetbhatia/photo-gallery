import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { PhotoCardComponent } from './gallery-view/photo-card.component';
import { LoadingScreenComponent } from './shared/loading-screen.component';
import { LoadingScreenInterceptor } from './shared/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GalleryViewComponent,
    PhotoCardComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
