import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

export class ArticleListComponent implements OnInit {

  public articlesList: Article[];
  public term = '';
  public categoryFilter = 'All';
  public isMenuCollapsed = true;
  public askConfirmation = [];
  public fakeDelete = [];
  public downloadComplete = false;
  public logged: boolean;

  // make it possible to be able to edit pictures (upload from hard disk) - Done!
  // clean up the code
  // separate login component - Done!
  // better styling

  constructor(private ns: NewsService, 
              private router: Router,
              private ls: LoginService) {
                this.ls.logged.subscribe(value => {
                  this.logged = value;
                  
                })
              }

  ngOnInit(): void {
    this.logged = this.ls.isLogged();

    this.ns.articlesList.subscribe(articles => {
      this.articlesList = articles;

      for(let i = 0; i < this.articlesList.length; i++) {
        this.askConfirmation.push(false);
        this.fakeDelete.push(false);
      }

      this.downloadComplete = true;
    });
  }

  viewArticle(id: number): void {
    this.ns.viewArticle(id);
    this.router.navigate(['/article']);
  }
  
  editArticle(id: number): void {
    this.ns.getArticle(id).subscribe(article => {
      this.ns.tmpArticle = article;
      this.router.navigate(['/edit']);
    }, err => {
      alert("We are sorry, but " + err.error.details.toLowerCase());
      
    });
  }
  
  newArticle(): void {
    this.ns.tmpArticle = {
      id: this.firstAvailableId(),
      id_user: null,
      // id_user: this.user.username, // remove this field?
      abstract: '',
      subtitle: '',
      body: '',
      update_date: '',
      category: '',
      title: '',
      image_data: '',
      image_media_type: '',
      thumbnail_image: '',
      thumbnail_media_type: ''
    };
    this.router.navigate(['/edit']);
  }
  
  removeArticle(id: number): void {
    if(typeof id === 'string')
      id = parseInt(id);
      
    this.ns.deleteArticle(id).subscribe(output => {
      console.log(output);

      if(output === null)
        this.fakeDelete[id] = true;
    });
  }
  
  findArticleInList(id: number): number {
    for (let i = 0; i < this.articlesList.length; i++) {
      if (this.articlesList[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  
  checkForDuplicates(id: number): boolean {
    return (this.findArticleInList(id) !== -1);
  }
  
  firstAvailableId(): number {
    for (let i = 0; i < this.articlesList.length; i++) {
      if (!this.checkForDuplicates(i)) {
        return i;
      }
    }
  }

}
