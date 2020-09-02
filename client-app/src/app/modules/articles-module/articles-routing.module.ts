import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArticleComponent } from './components/add-article/add-article.component';
import { NotLoggedUserGuard } from 'src/app/guards/not-logged-user/not-logged-user.guard';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { NotArticleCreatorGuard } from 'src/app/guards/not-article-creator/not-article-creator.guard';

const routes: Routes = [
  { path: 'add', component: AddArticleComponent, canActivate: [NotLoggedUserGuard] },
  { path: 'edit/:id', component: EditArticleComponent, canActivate: [NotArticleCreatorGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
