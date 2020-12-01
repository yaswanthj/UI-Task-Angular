import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { Hierarchy } from 'src/app/interfaces/hierarchy';
import { environment } from 'src/environments/environment';
import {
  AuthService
} from '../../services/auth/auth.service';
import {
  HttpRequestService
} from '../../services/http-request/http-request.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {

  hierarchy: Hierarchy;
  userName = localStorage.getItem('userName');


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
        this.hierarchy = success;
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
