import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { PhotoCardComponent } from './gallery-view/photo-card.component';
import { LoadingScreenComponent } from './shared/loading-screen.component';
import { LoadingScreenInterceptor } from './shared/loading.interceptor';
import { PhotoDetailsComponent } from './details/photo-details.component';
import { EditPhotoComponent } from './details/edit-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GalleryViewComponent,
    PhotoCardComponent,
    LoadingScreenComponent,
    PhotoDetailsComponent,
    EditPhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
