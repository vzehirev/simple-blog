import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReadArticleComponent } from '../read-article/read-article.component';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleViewModel } from 'src/app/models/article-view-model';

@Component({
  selector: 'app-article-home-card',
  templateUrl: './article-home-card.component.html',
  styleUrls: ['./article-home-card.component.css']
})
export class ArticleHomeCardComponent implements OnInit {

  @Input() article: ArticleViewModel;
  @Output() articleId = new EventEmitter<number>();
  constructor(public readArticleModalDialog: MatDialog) { }

  ngOnInit(): void {
  }

  editArticle(id) {
    console.log('TODO', id)
  }

  readArticle(title: string, content: string): void {
    this.readArticleModalDialog.open(ReadArticleComponent, { data: { title, content } });
  }

  deleteArticle(articleId: number): void {
    this.articleId.emit(articleId);
  }
}
