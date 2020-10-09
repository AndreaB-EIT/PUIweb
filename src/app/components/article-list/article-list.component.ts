import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  public articlesList: Article[];
  public term = '';
  public categoryFilter = 'All';
  public mobile: boolean;

  constructor(private ns: NewsService) { }

  ngOnInit(): void {
    this.ns.articlesList.subscribe(articles => {
      this.articlesList = articles;
    });
  }
}
