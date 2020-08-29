import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home-module/home.module').then(m => m.HomeModule) },
  { path: 'users', loadChildren: () => import('./modules/users-module/users.module').then(m => m.UsersModule) },
  { path: 'articles', loadChildren: () => import('./modules/articles-module/articles.module').then(m => m.ArticlesModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
