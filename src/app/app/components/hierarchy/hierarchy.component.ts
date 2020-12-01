import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../services/auth/auth.service';
import {
  HttpRequestService
} from '../../services/http-request/http-request.service';

export interface networkChilds {
  children: networkChilds[],
    nodeId: number,
    nodeName: string
}

export interface networkFirstLevel {
  callerId: string,
    nodeStandardMetadata: networkChilds
}

export interface network {
  status: number,
    entity: any
}
@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {

  data: network;


  constructor(
    private router: Router,
    private httpRequestService: HttpRequestService,
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
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout((status) => {
      if(status){
        this.router.navigate(['/login']);
      }
    });
  }

}
