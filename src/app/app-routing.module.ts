import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { PhotoDetailsComponent } from './details/photo-details.component';


const routes: Routes = [
  { path: 'gallery', component: GalleryViewComponent},
  { path: 'gallery/:id', component: PhotoDetailsComponent },
  { path: '', redirectTo: '/gallery', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
