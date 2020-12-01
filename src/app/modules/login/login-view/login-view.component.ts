import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/services/auth/auth.service';
import {
  HttpRequestService
} from 'src/app/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: new FormControl('',
        [
          Validators.required
          // Validators.email
        ]
      ),
      password: new FormControl('',
        [
          Validators.required
          // Validators.pattern("/^[A-Za-z]\w{7,14}$/")
        ]
      )
    });
  }

  submit() {
    this.submitted = true;

    // console.log(this.loginForm);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      let api = `${environment.server}/login?username=${this.loginForm.value.username}&password=${this.loginForm.value.password}`;
      // console.log(api);
      this.authService.login(api, (status) => {
        if (status) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
  
  storeToken(data) {
    sessionStorage.setItem('firstName', data.firstName);
    sessionStorage.setItem('lastName', data.lastName);
    sessionStorage.setItem('userName', data.userName);
    document.cookie = 'tokenID =' + data.key + ';path=/';
  }


}
