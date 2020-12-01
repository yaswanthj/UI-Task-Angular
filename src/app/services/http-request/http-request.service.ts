import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {


  constructor(
    private http: HttpClient
  ) {}

  getRequest(api: string) {
    return this.http.get(api).pipe(
      map(response => {
        return response; // kind of useless
      }),
      catchError((res: HttpErrorResponse) => {
        return this.handleError(res);
      }),
    );
  }

  postRequest(api: string, data: any) {
    return this.http.post(api, data).pipe(
      map(response => {
        return response; // kind of useless
      }),
      catchError((res: HttpErrorResponse) => {
        return this.handleError(res);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
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

  deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  

}
