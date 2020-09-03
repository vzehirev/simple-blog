import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReadArticleComponent } from '../read-article/read-article.component';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { ArticleViewModel } from 'src/app/models/articles/article-view.model';
import { EditArticleComponent } from '../edit-article/edit-article.component';

@Component({
  selector: 'app-article-home-card',
  templateUrl: './article-home-card.component.html',
  styleUrls: ['./article-home-card.component.css']
})
export class ArticleHomeCardComponent {
  @Input() article: ArticleViewModel;
  @Output() articleId = new EventEmitter<number>();

  constructor(public modalDialog: MatDialog, private articlesService: ArticlesService) { }

  editArticle() {
    let dialog = this.modalDialog.open(EditArticleComponent, { data: this.article });
    dialog.componentInstance.editedArticle.subscribe(editedArticle => {
      this.articlesService.editArticle(editedArticle).subscribe(() => {
        this.article.title = editedArticle.title;
        this.article.content = editedArticle.content;
        dialog.close();
      })
    });
  }

  readArticle(): void {
    this.modalDialog.open(ReadArticleComponent, { data: this.article });
  }

  deleteArticle(articleId: number): void {
    this.articleId.emit(articleId);
  }
}
