import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpRequestService } from '../../services/http-request/http-request.service';

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
          Validators.required
          // Validators.pattern("/^[A-Za-z]\w{7,14}$/")
        ]
      ),
      customerAddress: new FormControl('',
      [
        Validators.required
        // Validators.pattern("/^[A-Za-z]\w{7,14}$/")
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
      let api = `https://test.greenkoncepts.com/gktest/createCustomer?token=${tokenID}`;
      // console.log(api);
      this.httpRequestsService.postRequest(api, this.customerForm.value).subscribe(
        (success: any) => {
            console.log(success);
            this.userAdditon =true
          },
          (error) => {
              console.log(error);
          }
      );
    }
  }

  
  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
