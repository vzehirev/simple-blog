import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotArticleCreatorGuard implements CanActivate {

  constructor(private articlesService: ArticlesService) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.articlesService.isCreator(next.params['id']).pipe(map(result => {
      return result;
    }));
  }
}
