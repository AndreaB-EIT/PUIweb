import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipePipe implements PipeTransform {

  transform(articlesList: Article[], categoryFilter: string): Article[] {
    
    if (categoryFilter!=='All')
      return articlesList.filter(article => (article.category === categoryFilter));
    else 
      return articlesList;
  }

}
