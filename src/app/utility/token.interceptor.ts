import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
//token:string='eyJleHAiOjE2NDk4NTY3MjgsImlhdCI6MTY0OTg1NTgyOCwianRpIjoiNjJiNWZiZmUtYWE3Zi00NmViLTkyNTItZWI2MjYxNjQyMjk1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYWluIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijk0ODAyMjNhLTU0NTctNDU3My04Zjc3LWRkYjkxYjU1YmQ5NyIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1haW4iLCJzZXNzaW9uX3N0YXRlIjoiOWVjNWIxOWUtNDUzZi00Nzg2LTkyOGUtNmI1MjE1YWQ5NzljIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjQyMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLW1haW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiOWVjNWIxOWUtNDUzZi00Nzg2LTkyOGUtNmI1MjE1YWQ5NzljIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJ3YWxsYWNlIHdhbGxhY2UiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ3YWxsYWNlYWJ1b25qaUB5YWhvby5jb20iLCJnaXZlbl9uYW1lIjoid2FsbGFjZSIsImZhbWlseV9uYW1lIjoid2FsbGFjZSIsImVtYWlsIjoid2FsbGFjZWFidW9uamlAeWFob28uY29tIn0'

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        //'Authorization': `Bearer ${this.token}`,
      },
    });

    return next.handle(req);
  }
}
