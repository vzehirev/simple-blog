import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddArticleComponent } from './components/add-article/add-article.component'
import { SharedLayoutModule } from '../shared-layout/shared-layout.module';
import { ArticleHomeCardComponent } from './components/article-home-card/article-home-card.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ReadArticleComponent } from './components/read-article/read-article.component';

@NgModule({
  declarations: [
    AddArticleComponent,
    ArticleHomeCardComponent,
    EditArticleComponent,
    ReadArticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedLayoutModule
  ],
  exports: [
    ArticleHomeCardComponent,
    ReadArticleComponent
  ]
})
export class ArticlesModule { }
