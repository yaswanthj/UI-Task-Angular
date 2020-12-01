import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  submitted = false;
  userAdditon= false;

  constructor(
    private formBuilder: FormBuilder,
    private httpRequestsService: HttpRequestService,
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

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
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(3)
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
    this.submitted = true;

    // console.log(this.customerForm);
    // stop here if form is invalid
    if (this.customerForm.invalid) {
      return;
    } else {
      let tokenID = this.authService.getCookie('tokenID');
      let api = `${environment.server}/createCustomer?token=${tokenID}`;
      // console.log(api);
      this.httpRequestsService.postRequest(api, this.customerForm.value).subscribe(
        (success: any) => {
            this.userAdditon =true
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
