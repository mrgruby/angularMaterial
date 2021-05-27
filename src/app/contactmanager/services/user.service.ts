import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]>;

  //Private datastore to hold users in memory
  private dataStore: {
    users: User[]
  }

  private test: User[] | undefined;

  constructor(private http: HttpClient) {
    this.dataStore = {users: []};
    this._users = new BehaviorSubject<User[]>([]);//Initialize the _users BehaviorSubject
  }

  get users(): Observable<User[]>{
    return this._users.asObservable();
  }

  userById(id: number){
    return this.dataStore.users.find(x => x.id == id);
  }

  loadAll(){
    const usersUrl = "https://angular-material-api.azurewebsites.net/users";

    return this.http.get<User[]>(usersUrl)
    .subscribe(data => {
      this.dataStore.users = data;
      //Let subscribers to the Behaviour Subject know when new data is recieved from loadAll()
      this._users.next(Object.assign({}, this.dataStore).users);//Copy dataStore.users to a new Object, and push that to the subscribers.
    }, error => {
      console.log("Failed to fetch users")    
    });
  }
}
