import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleViewModel } from 'src/app/models/article-view-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: ArticleViewModel[];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAll().subscribe(result => this.articles = result);
  }

  delete(articleId: number): void {
    if (confirm('Delete article?')) {
      this.articlesService.deleteArticle(articleId).subscribe(result => {
        if (result === true) {
          this.articles = this.articles.filter(a => a.id !== articleId);
        }
      });
    }
  }
}
