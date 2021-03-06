import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../endpoints';
import { Observable } from 'rxjs';
import { ArticleViewModel } from '../../models/articles/article-view.model';
import { EditArticleModel } from '../../models/articles/edit-article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  addArticle(title: string, content: string): Observable<any> {
    return this.httpClient.post(Endpoints.Server + Endpoints.AddArticle, { title, content });
  }

  getAll(): Observable<ArticleViewModel[]> {
    return this.httpClient.get<ArticleViewModel[]>(Endpoints.Server + Endpoints.GetAllArticles);
  }

  editArticle(article: EditArticleModel): Observable<any> {
    return this.httpClient.patch(Endpoints.Server + Endpoints.EditArticle, article);
  }

  isCreator(articleId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(Endpoints.Server + Endpoints.IsCreator + `/${articleId}`);
  }

  deleteArticle(articleId: number): Observable<any> {
    return this.httpClient.delete(Endpoints.Server + Endpoints.DeleteArticle + `/${articleId}`);
  }
}
