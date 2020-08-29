import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArticleComponent } from './components/add-article/add-article.component';
import { NotLoggedUserGuard } from 'src/app/guards/not-logged-user/not-logged-user.guard';

const routes: Routes = [
  { path: 'add', component: AddArticleComponent, canActivate: [NotLoggedUserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
