import { Injectable } from '@angular/core';

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

}