import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import * as _ from 'lodash';

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
  public un = '';
  public pw = '';
  public logged = false;
  public user: User;
  // public imagePaths = [];
  public article: Article; // including the elements of the articles
  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;

  // clean up the code
  // separate login component
  // better styling

  constructor(private ns: NewsService, 
              private router: Router,
              private ls: LoginService) { }

  ngOnInit(): void {

    this.user = this.ls.getUser();
    this.logged = this.ls.isLogged();

    this.ns.articlesList.subscribe(articles => {
      this.articlesList = articles;

      for(let i = 0; i < this.articlesList.length; i++) {
        this.askConfirmation.push(false);
        this.fakeDelete.push(false);
      }

      this.downloadComplete = true;
    });

    // this.user = {
    //   apikey: 'xxx',
    //   username: 'test',
    //   password: 'test'
    // };

    // for(let i = 0; i < this.articlesList.length; i++)
    //   this.imagePaths[this.articlesList[i].id] = 
    //   this._sanitizer
    //     .bypassSecurityTrustResourceUrl('data:' + 
    //       this.articlesList[this.articlesList[i].id].thumbnail_media_type 
    //       + ';base64,'
    //       + this.articlesList[this.articlesList[i].id].thumbnail_image);
    // console.log(this.imagePaths)
  }

  viewArticle(id: number): void {
    this.ns.viewArticle(id);
    this.router.navigate(['/article']);
  }
  
  editArticle(id: number): void {
    this.ns.getArticle(id).subscribe(article => {
      this.ns.tmpArticle = article;
      this.router.navigate(['/edit']);
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
    // this.articlesList[this.findArticleInList(id)].is_deleted = 1;
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

  signIn(): void {
    
    this.ls.login(this.un, this.pw).subscribe(WonderOfU => {
      this.user = WonderOfU; // https://bit.ly/2Fkxub1
      this.ns.setUserApiKey(this.user.apikey);
      if(this.ls.isLogged())
        this.logged = true;
      else {
        alert('Wrong username or password!');
      }
    });
    
  }
  
  signOut(): void {
    
    this.ls.logout();
    this.logged = false;
    this.user = null;

    this.ns.setAnonymousApiKey();

  }
  
  // WIP Images loading
  // only for editing
  fileChangeEvent(fileInput: any) {
    // this.article = art;
    console.log(this.article);
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_media_type = fileInput.target.files[0].type;
          const head = this.article.image_media_type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
