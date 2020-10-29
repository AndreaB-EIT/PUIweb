import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  public toView: Article;

  constructor(private ns: NewsService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {  
    let tmp = localStorage.getItem("toView");
    console.log("Receiving: " + tmp);
    if(tmp == null)
      this.router.navigate(['/']);
    else
      this.ns.getArticle(parseInt(tmp)).subscribe(article => {
        this.toView = article;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
