import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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
  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;

  constructor(
    private breakPointObserver: BreakpointObserver, 
    private userService: UserService,
    private router: Router) {}

  //This is used to set the "mode" and the "opened" properties of the mat-sidenav element. 
  public isScreenSmall: boolean | undefined;

  //Declare Observable for the markup to bind to. We can subscribe to this directly in the markup, by using a async pipe |
  users: Observable<User[]> | undefined;

  ngOnInit(): void {
    //This is specific to opening or closing the sidenav if the screensize changes
    this.breakPointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) => this.isScreenSmall = state.matches)

    //Initialize the observable property to the one that is exposed by the user service. This calls asObservable on the behavioursubject in the user service
    this.users = this.userService.users;
    this.userService.loadAll();

    //Subscribe to the users observable, which is exposed through the behavioursubject in the user service
    this.users.subscribe(data => {
      if(data.length > 0){
        this.router.navigate(['./contactmanager', data[0].id])};
    });

    this.router.events.subscribe(() => {
      if(this.isScreenSmall){
        this.sidenav?.close();
      }
    })
  }
}
