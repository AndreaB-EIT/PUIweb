import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { NewsService } from 'src/app/services/news.service';
import { formatDate, Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {

  public tmpArticle: Article;
  private isItNew: boolean;
  public askConfirmation = false;

  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;

  public newPic = false;
  public oldImgType: string;
  public oldImgData: string;

  @ViewChild('articleForm') articleForm: any;

  constructor(private ns: NewsService,
              private location: Location,
              private ls: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    if(!this.ls.isLogged())
      this.router.navigate(['/articles-list']);

    this.tmpArticle = this.ns.tmpArticle;
    this.isItNew = this.tmpArticle.category === '';
  }

  submitArticle(): void {
    let now = new Date();
    this.tmpArticle.update_date = formatDate(now, 'yyyy-MM-dd HH:mm:ss', 'es');

    if(this.isItNew) {

      this.ns.createArticle(this.tmpArticle).subscribe(article => {
        console.log(article);
        this.router.navigate(['/articles-list']);
      }, err => {
        console.log(err);
        alert(err);
      });
      
    }
    else {
      this.ns.updateArticle(this.tmpArticle).subscribe(article => {          
          this.router.navigate(['/articles-list']);
      }, err => {
        console.log(err);
        alert(err);
      });
      
    }
  }

  goBack(): void {
    this.revertImage();
    this.location.back();
  }

  // only for editing
  fileChangeEvent(fileInput: any) {
    this.newPic = true;
    this.oldImgType = this.tmpArticle.image_media_type;
    this.oldImgData = this.tmpArticle.image_data;

    console.log(this.tmpArticle);
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

          this.tmpArticle.image_media_type = fileInput.target.files[0].type;
          const head = this.tmpArticle.image_media_type.length + 13;
          this.tmpArticle.image_data = e.target.result.substring(head, e.target.result.length);

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  revertImage(): void {
    this.tmpArticle.image_media_type = this.oldImgType;
    this.tmpArticle.image_data = this.oldImgData;
    this.newPic = false;
  }

}
