import {
  Injectable
} from '@angular/core';
import {
  retry
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  HttpRequestService
} from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpRequestService: HttpRequestService) {}


  login(api, callback) {
    this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
        this.storeToken(success);
        callback(true);
      },
      (error) => {
        callback(false);
      }
    );
  }

  storeToken(data) {
    sessionStorage.setItem('firstName', data.firstName);
    sessionStorage.setItem('lastName', data.lastName);
    sessionStorage.setItem('userName', data.userName);
    document.cookie = 'tokenID =' + data.key + ';path=/';
  }

  isLoggedIn() {
    return (document.cookie.indexOf('tokenID=') !== -1);
  }

  deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  logout(callback) {
    let tokenID = this.getCookie('tokenID');
    let api = `${environment.server}/logout?token=${tokenID}`;
    return this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
        // this.route.navigate(['/dashboard']);
        this.deleteCookie('tokenID');
        // return true;
        callback(true);
      },
      (error) => {
        console.error(error);
        callback(false);
      }
    );
  }
  
  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

}
