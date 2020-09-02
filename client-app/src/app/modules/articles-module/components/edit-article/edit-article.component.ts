import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';

import { ArticlesService } from 'src/app/services/articles.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleViewModel } from 'src/app/models/article-view-model';
import { EditArticleModel } from 'src/app/models/edit-article-model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  @Output() editedArticle = new EventEmitter<EditArticleModel>();

  editArticleForm: FormGroup;
  isFormInvalid: boolean;

  get newTitle() { return this.editArticleForm.get('title'); }
  get newContent() { return this.editArticleForm.get('content'); }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.editArticleForm = new FormGroup({
      title: new FormControl(this.data.title, [Validators.required, Validators.minLength(10)]),
      content: new FormControl(this.data.content, [Validators.required, Validators.minLength(100)])
    })
  }

  submitForm() {
    let editedArticleModel = new EditArticleModel(this.data.id, this.newTitle.value, this.newContent.value);

    this.editedArticle.emit(editedArticleModel);
  }
}
