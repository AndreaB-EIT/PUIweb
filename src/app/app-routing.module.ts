import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleEditionComponent } from './components/article-edition/article-edition.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/article-list', pathMatch: 'full'},
  {path: 'article-list', component: ArticleListComponent},
  {path: 'article', component: ArticleDetailsComponent},
  {path: 'edit', component: ArticleEditionComponent},
  {path: 'new', redirectTo: '/edit', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
