import {
  Location
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
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
import {
  environment
} from 'src/environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  userAdditon = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpRequestsService: HttpRequestService,
    private router: Router,
    private authService: AuthService
  ) {}


  static customValidator: ValidatorFn = (age): ValidationErrors => {
    if (age.value > 100) {
      return {
        old: true
      }
    } else {
      null;
    }
  }

  ngOnInit(): void {

    this.customerForm = this.formBuilder.group({
      customerName: new FormControl('',
        [
          Validators.required
          // Validators.email
        ]
      ),
      customerAge: new FormControl('',
        [
          Validators.required,
          CustomerComponent.customValidator,
          Validators.pattern("^[0-9]*$"),
        ]
      ),
      customerAddress: new FormControl('',
        [
          Validators.required
        ]
      )
    });
  }

  submit() {

    if (this.customerForm.invalid) {
      return;
    } else {
      let tokenID = this.authService.getCookie('tokenID');
      let api = `${environment.server}/createCustomer?token=${tokenID}`;
      this.httpRequestsService.postRequest(api, this.customerForm.value).subscribe(
        (success: any) => {
          this.userAdditon = true
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }


  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
