import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/service/user.service';
import {map, Observable} from'rxjs';
import { CanActivate, Router} from '@angular/router';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted : boolean = false;
  formControlClass:string = "form-control form-control-sm ";
  isValid : string = 'is-valid'
  @Input() modalData?: BsModalRef;
  token:string;
  datasFromToken:any;
  errorLogin : string;
  

  profileForm:FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private fb: FormBuilder, private service : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    this.submitted = true;
    const subscribe = this.service.login(this.profileForm.value).subscribe({
      next : data => {
      this.service.token.next(data.token);
      this.datasFromToken = this.service.infosFromConnectedUser(data.token);
      this.service.checkIfIsauthenticated().next(this.datasFromToken.role);
      this.router.navigate(['/dashboard']);
      this.modalData?.hide();
      }, 
      error : (e) => {
        this.errorLogin = e.error['message']
      }
      });
      this.profileForm.reset();  
  }
    
}
