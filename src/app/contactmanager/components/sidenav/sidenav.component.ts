import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

  const SMALL_WIDTH_BREAKPOINT = 720;
  @Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  constructor(private breakPointObserver: BreakpointObserver, private userService: UserService) {}

  public isScreenSmall: boolean | undefined;

  //Declare Observable for the markup to bind to
  users: Observable<User[]> | undefined;

  ngOnInit(): void {
    this.breakPointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) => this.isScreenSmall = state.matches)

    //Initialize the observable property to the one that is exposed by the user service. This calls asObservable on the behavioursubject in the user service
    this.users = this.userService.users;
    this.userService.loadAll();

    //Subscribe to the users observable, which is exposed through the behavioursubject in the user service
    this.users.subscribe(data => console.log(data));
  }
}
