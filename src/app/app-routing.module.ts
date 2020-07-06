import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { PhotoDetailsComponent } from './details/photo-details.component';
import { DetailsPageGuard } from './details-page.guard';
import { EditPhotoComponent } from './details/edit-photo.component';
import { AddPhotoComponent } from './details/add-photo.component';


const routes: Routes = [
  { path: 'gallery', component: GalleryViewComponent},
  { path: 'gallery/add', component: AddPhotoComponent },
  { path: 'gallery/:id', component: PhotoDetailsComponent, canActivate: [DetailsPageGuard] },
  { path: 'gallery/edit/:id', component: EditPhotoComponent, canActivate: [DetailsPageGuard] },
  { path: '', redirectTo: '/gallery', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
