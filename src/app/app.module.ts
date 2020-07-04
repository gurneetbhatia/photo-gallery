import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { PhotoCardComponent } from './gallery-view/photo-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GalleryViewComponent,
    PhotoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
