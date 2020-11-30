import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestsService } from '../../services/http-requests.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpRequestsService: HttpRequestsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      customerName: new FormControl('',
        [
          Validators.required
          // Validators.email
        ]
      ),
      age: new FormControl('',
        [
          Validators.required
          // Validators.pattern("/^[A-Za-z]\w{7,14}$/")
        ]
      ),
      address: new FormControl('',
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
            // this.route.navigate(['/dashboard']);
            // this.route.navigate(['/customer', { id: 1 }]);

      //     },
      //     (error) => {
      //         console.log(error);
      //     }
      // );
    }
  }

  
  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
