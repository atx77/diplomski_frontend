import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../constant/api-constants';
import { UpdatePersonalInformationForm } from '../model/form/update-personal-information-form.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User;

  constructor(private http: HttpClient,
    private apiConstants: ApiConstants) { }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(this.apiConstants.getLoggedUser());
  }

  setLoggedUser(user: User) {
    this.loggedUser = user;
  }

  isUserLoggedIn(): boolean {
    return !!this.loggedUser;
  }

  updatePersonalInformation(updatePersonalInformationForm: UpdatePersonalInformationForm): Observable<string> {
    return this.http.post<string>(this.apiConstants.updatePersonalInformation(), updatePersonalInformationForm);
  }
}
