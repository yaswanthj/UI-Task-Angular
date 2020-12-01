import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpRequestService } from '../../services/http-request/http-request.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {

  data: any;
  list: any;



  constructor(
    private router: Router, 
    private httpRequestService:HttpRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getHierarchy();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  getHierarchy() {
    let tokenID = this.authService.getCookie('tokenID');
    let api = `https://test.greenkoncepts.com/gktest/node-hierarchy?token=${tokenID}`;
    console.log(api);
    this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
          this.data = success;
          this.list = this.data.entity.nodeStandardMetadata.children;
        },
        (error) => {
            console.log(error);
        }
    );
  }
  
  logout(){
    console.log('logout');
  }

}
