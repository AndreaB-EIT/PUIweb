import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  public downloadComplete = false;
  // public imagePaths = [];
  // public imageError: string;

  constructor(private ns: NewsService, 
              private router: Router) { }

  ngOnInit(): void {
    this.ns.articlesList.subscribe(articles => {
      this.articlesList = articles;

      for(let i = 0; i < this.articlesList.length; i++)
        this.askConfirmation.push(false);

      this.downloadComplete = true;
    });

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
      id_user: 'username', // temporary
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
    // temporary for safety until we get the API keys:
    alert('Bang! ' + id + ' just got blasted');
    // this.articlesList[this.findArticleInList(id)].is_deleted = 1;
    // this.ns.deleteArticle(id);
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
  
  // WIP Images loading
  
  // fileChangeEvent(fileInput: any) {
    //   this.imageError = null;
    //   if (fileInput.target.files && fileInput.target.files[0]) {
      //     // Size Filter Bytes
  //     const MAX_SIZE = 20971520;
  //     const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

  //     if (fileInput.target.files[0].size > MAX_SIZE) {
  //       this.imageError =
  //         'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
  //       return false;
  //     }
  //     if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
  //       this.imageError = 'Only Images are allowed ( JPG | PNG )';
  //       return false;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const image = new Image();
  //       image.src = e.target.result;
  //       image.onload = rs => {
  //         const imgBase64Path = e.target.result;
  //         this.cardImageBase64 = imgBase64Path;
  //         this.isImageSaved = true;

  //         this.article.image_media_type = fileInput.target.files[0].type;
  //         const head = this.article.image_media_type.length + 13;
  //         this.article.image_data = e.target.result.substring(head, e.target.result.length);

  //       };
  //     };
  //     reader.readAsDataURL(fileInput.target.files[0]);
  //   }
  // }

}
