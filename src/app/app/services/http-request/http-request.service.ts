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

  setHeaders(tokenID: string) {
    tokenID = tokenID.split('"').join('');
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Auth-Token': tokenID
      })
    };
    return httpOptions;
  }

  getRequest(api: string) {
    const headers = this.setHeaders(this.getCookie('tokenID'));
    // const headers = this.setHeaders(userEmail);
    return this.http.get(api, headers).pipe(
      map(response => {
        return response; // kind of useless
      }),
      catchError((res: HttpErrorResponse) => {
        if (res.status === 403) {
          return throwError(res.status);
        }
        this.handleError(res);
      }),
      retry(1), // retry a failed request up to 1 time
    );
  }

  postRequest(api: string, data: any) {
    const headers = this.setHeaders(this.getCookie('tokenID'));
    // const headers = this.setHeaders(userEmail);
    return this.http.post(api, data, headers).pipe(
      map(response => {
        return response; // kind of useless
      }),
      catchError((res: HttpErrorResponse) => {
        if (res.status === 403) {
          return throwError(res.status);
        }
        this.handleError(res);
      }),
      retry(1), // retry a failed request up to 1 time
    );
  }


  putRequest(api: string, data: any) {
    const headers = this.setHeaders(this.getCookie('tokenID'));
    // const headers = this.setHeaders(userEmail);
    return this.http.put(api, data, headers).pipe();
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


  storeDataInSheet(url) {
    return this.http.get(url)
      .pipe(
        map(response => {
          return response;
        }),
        catchError((e: any) => {
          return throwError(e);
        }),
      );
  }

}
