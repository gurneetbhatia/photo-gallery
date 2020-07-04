import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryViewComponent } from './gallery-view/gallery-view.component';


const routes: Routes = [
  { path: 'gallery', component: GalleryViewComponent},
  { path: '', redirectTo: '/gallery', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
