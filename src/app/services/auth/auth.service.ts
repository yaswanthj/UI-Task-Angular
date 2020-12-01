import {
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpRequestService
} from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpRequestService: HttpRequestService) {}


  login(payloadData, callback) {
    let api = `${environment.server}/login?username=${payloadData.username}&password=${payloadData.password}`;
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
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('userName', data.userName);
    document.cookie = 'tokenID =' + data.key + ';path=/';
  }

  isLoggedIn() {
    return (document.cookie.indexOf('tokenID=') !== -1);
  }

  logout(callback) {
    let tokenID = this.getCookie('tokenID');
    let api = `${environment.server}/logout?token=${tokenID}`;
    return this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
        this.deleteCookie('tokenID');
        this.removeSession();
        callback(true);
      },
      (error) => {
        callback(false);
      }
    );
  }
  
  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let eachRecord = cookieArray[i];
      while (eachRecord.charAt(0) === ' ') {
        eachRecord = eachRecord.substring(1);
      }
      if (eachRecord.indexOf(name) === 0) {
        return eachRecord.substring(name.length, eachRecord.length);
      }
    }
    return '';
  }


  deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 2020 00:00:01 GMT;';
  }

  removeSession() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userName');
  }
}
