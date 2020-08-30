import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  addArticle(title: string, content: string): Observable<any> {
    return this.httpClient.post(Endpoints.Server + Endpoints.AddArticle, { title, content });
  }
}
