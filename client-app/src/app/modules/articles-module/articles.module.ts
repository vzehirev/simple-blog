import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { MaterialModule } from '../material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddArticleComponent } from './components/add-article/add-article.component'
import { SharedLayoutModule } from '../shared-layout-module/shared-layout.module';

@NgModule({
  declarations: [AddArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedLayoutModule
  ]
})
export class ArticlesModule { }
