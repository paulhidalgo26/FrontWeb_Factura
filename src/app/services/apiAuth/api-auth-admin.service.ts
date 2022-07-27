import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from 'src/app/models/login';
import { Response } from 'src/app/models/response';
import { User } from 'src/app/models/user';
import { AthURL } from 'src/app/resources/AthURL';

const httpOptions = {
  headers: new HttpHeaders({
      'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiAuthAdminService {
  url: string = AthURL.ADMIN_LOGIN;
  private userSubject!: BehaviorSubject<User>;
  public us!: Observable<User>;
  public get userData(): User{
    return this.userSubject.value;
  }
  constructor(
    private _http: HttpClient
  ){
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("User")!)
    );
    this.us = this.userSubject.asObservable();
  }

  login(login: Login): Observable<Response>{
    return this._http.post<Response>(this.url, login, 
      httpOptions).pipe(
          map(res => {
              if(res.success){
                  const user: User = res.data;
                  user.admin = true;
                  localStorage.setItem("User", JSON.stringify(user));
                  this.userSubject.next(user);
              }
              return res;
          })
      );
  }
  logout(){
    localStorage.removeItem("User");
    this.userSubject.next(null!);
  }
}