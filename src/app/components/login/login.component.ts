import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public un = '';
  public pw = '';
  public logged = false;
  public user: User;

  constructor(private ls: LoginService, private ns: NewsService) { }

  ngOnInit(): void {
    this.logged = this.ls.isLogged();
    this.user = this.ls.getUser();
  }

  signIn(): void {
    this.ls.login(this.un, this.pw).subscribe(WonderOfU => {
      this.user = WonderOfU; // https://bit.ly/2Fkxub1
      this.ns.setUserApiKey(this.user.apikey);
      if(this.ls.isLogged()) {
        this.logged = true;
      }
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

}
