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


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  loginForm: FormGroup;
  invalidCredentials = false;

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
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.value, (status) => {
        if (status) {
          this.router.navigate(['/dashboard']);
        } else {
          this.invalidCredentials = true;
        }
      });
    }
  }

}
