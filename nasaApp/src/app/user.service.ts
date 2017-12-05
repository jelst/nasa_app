import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{HttpParams} from '@angular/common/http';

@Injectable()
export class UserService {
    
    private isLoggedIn;
    private username;

  constructor() {
      this.isLoggedIn = false;
  }
  setUserLoggedIn(){
      this.isLoggedIn = true;
  }
  getUserLoggedIn(){
      return this.isLoggedIn;
  }
  /*
  getPassword(username){
      return new Promise((resolve,reject)=>{
          this.httpClient.get('https://lab5-jelst.c9users.io:8081/api/user/' + username).subscribe(data=>{
              resolve(data[0][password]))
          }
      })
  }
  */

}