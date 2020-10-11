import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { formatDate, Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {

  public tmpArticle: Article;
  private isItNew: boolean;
  public askConfirmation: boolean;

  @ViewChild('articleForm') articleForm: any;

  constructor(private ns: NewsService,
              private location: Location,
              private ls: LoginService,
              private router: Router) { }

  ngOnInit(): void {

    if(!this.ls.isLogged())
      this.router.navigate(['/articles-list']);

    this.askConfirmation = false;
    this.tmpArticle = this.ns.tmpArticle;
    console.log(this.tmpArticle);
    this.isItNew = this.tmpArticle.category === '';
    console.log(this.isItNew);
  }

  submitArticle(): void {
    let now = new Date();
    this.tmpArticle.update_date = formatDate(now, 'yyyy-MM-dd HH:mm:ss', 'es');

    if(this.isItNew) {

      this.tmpArticle.image_data = '';
      this.tmpArticle.image_media_type = '';
      this.tmpArticle.thumbnail_image = '';
      this.tmpArticle.thumbnail_media_type = '';

      console.log('Created article: ');
      console.log(this.tmpArticle);
    }
    else {
      console.log('Edited article: ' + this.tmpArticle.id + '; now:');
      console.log(this.tmpArticle);
    }

    // this.ns.getArticle(this.tmpArticle.id).subscribe(article => {
    //   if(article === this.tmpArticle) { // except update date field
    //     alert('The operation was successful!');
    //     this.router.navigate(['/articles-list']);
    //   }
    //   else
    //     alert('There was an issue somewhere');
    // })
  }

  goBack(): void {
    this.location.back();
  }

}
