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

  constructor(private ns: NewsService, 
              private router: Router,
              private ls: LoginService) {
                this.ls.logged.subscribe(value => {
                  this.logged = value;
                  
                })
              }

  ngOnInit(): void {
    this.logged = this.ls.isLogged();

    this.ns.getArticles().subscribe(articles => {
      this.articlesList = articles;

      for(let i = 0; i < this.articlesList.length; i++) {
        this.askConfirmation.push(false);
        this.fakeDelete.push(false);
      }

      this.downloadComplete = true;
    });
  }

  viewArticle(id: number): void {
    localStorage.setItem("toView", id.toString());
    console.log("Sending: " + localStorage.getItem("toView"));
    this.router.navigate(['/article']);
  }
  
  editArticle(id: number): void {
    localStorage.setItem("toEdit", id.toString());
    console.log("Sending: " + localStorage.getItem("toEdit"));
    this.router.navigate(['/edit']);
  }
  
  newArticle(): void {
    localStorage.setItem("toEdit", "new");
    console.log("Sending: " + localStorage.getItem("toEdit"));
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
