import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

  const SMALL_WIDTH_BREAKPOINT = 720;
  @Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  constructor(private breakPointObserver: BreakpointObserver) { }
  public isScreenSmall: boolean | undefined;

  ngOnInit(): void {
    this.breakPointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) => this.isScreenSmall = state.matches)
  }
}
