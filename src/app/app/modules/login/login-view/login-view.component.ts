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
import { Router } from '@angular/router';

import {HttpRequestsService} from '../../../services/http-requests.service'

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
    private httpRequestsService: HttpRequestsService,
    private route: Router
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
      let api = 'http://localhost/open_training/app/events/get-events.php?type=past';
      console.log(api);
      // this.httpRequestsService.postRequest(api, this.loginForm.value).subscribe(
      //   (success: any) => {
            // window.location.href =  '/';
            // this.route.navigate(['/dashboard']); // navigate to other page
            // this.route.navigate(['dashboard'], { relativeTo: this.route });
            this.route.navigate(['/dashboard']);
            // this.route.navigate(['/customer', { id: 1 }]);

      //     },
      //     (error) => {
      //         console.log(error);
      //     }
      // );
    }
  }

}
