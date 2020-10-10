import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  // public imagePaths = [];
  // public imageError: string;

  constructor(private ns: NewsService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.ns.articlesList.subscribe(articles => {
      this.articlesList = articles;
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
