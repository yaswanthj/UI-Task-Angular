import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { environment } from 'src/environments/environment';
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
  userName = sessionStorage.getItem('userName');


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
    let api = `${environment.server}/node-hierarchy?token=${tokenID}`;
    this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
        this.data = success;
      },
      (error) => {
        console.error(error);
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
