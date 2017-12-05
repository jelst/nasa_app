import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  visible = false;

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  }
  
  loginUser(e){
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    
    if(username == "admin" && password == "password123"){
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
    }
    else if(username == ""){
      alert('Please enter an email');
    }
    else if(password == ""){
      alert('Please enter a password');
    }
    else{
      alert('Login was unsuccessful')
    }
  }
  
  toggleVis(){
    this.visible = !this.visible;
  }
  
  createAccount(e){
    e.preventDefault();
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
  }
  
  showAbout(){
    this.router.navigate(['about-page']);
  }

}