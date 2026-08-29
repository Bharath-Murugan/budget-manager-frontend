import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/CategoryService';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'budget manager login';
  email='';
  password='';
  errorMsg='';

  Categories: string[] =['Food','Transport','Entertainment','Utilities','Health','Education','Shopping','Other'];
  constructor(private categoryservice: CategoryService,
    private loginservice: LoginService,
    private router: Router){}
  
  // loadCategories(){
  //   this.categoryservice.getAllCategories().subscribe(response => {
  //     console.log(response);
  //   })
  // }


  login(){

    if(!this.email || !this.password){
      this.errorMsg = 'Please enter both email and password';
      return;
    }

    const loginRequest = {
      email: this.email,
      password: this.password
    };
    console.log('Email:',this.email);
    console.log('Password: ',this.password);

    // this.categoryservice.getAllCategories().subscribe(response => {
    //   console.log('Categories:', response);
    // });


    //this.loadCategories();

    this.loginservice.login(loginRequest).subscribe(response => {
     if(response){
      sessionStorage.setItem("loggedIn", "true");
      this.router.navigate(['/dashboard']);
      console.log(sessionStorage.getItem("loggedIn"));
     }else {
      alert('Invalid email or password');
     }
    });
  }
}
