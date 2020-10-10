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
    
    // let tmpArray = [];

    // if(categoryFilter!=='All')
    //   for(let i = 0; i < articlesList.length; i++) {
    //     if(articlesList[i].category === categoryFilter)
    //       tmpArray.push(articlesList[i]);
    //   }
    // else return articlesList;
    
    // return tmpArray;

    // return articlesList;

    // articlesList.subscribe(articles => {
    //   //tmpArray = articles;
    //   return articlesList.pipe(map(articles =>
    //     articles.filter(article => article.category === categoryFilter)));
    // });


    // return articlesList.map(articlesList => 
    //   articlesList.filter((article) => 
    //   articlesList.map((task) => task.id).indexOf(article.category) < 0
    // ));
    

    // for(let i = 0; i < articlesList.length; i++)
    //   if(articlesList[i].category === categoryFilter)
    //     tmpArray.push(articlesList[i]);

    // return tmpArray;

    // articlesList.subscribe(articles => {
    //   for (let i = 0; i < articles.length; i++)
    //     if (articles[i].category===categoryFilter)
    //       tmpArray.push(articles[i]);
    // });

    // const h = articlesList.pipe(filter(article => 
    //   article[0].category === categoryFilter));

    // articlesList.pipe(filter(articles => {
    //   for(let i = 0; i < articles.length; i++)
    //     if(articles[i].category === categoryFilter)
    //       tmpArray.push(articles[i]);
    // }));

    // articlesList.forEach(article => {
    //   if(article.category === categoryFilter)
    //     tmpArray.push(article);
    // });
    // return tmpArray;

    //return Observable.of(tmpArray);
  }

}
