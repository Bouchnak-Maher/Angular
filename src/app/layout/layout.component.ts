import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user !:any;
  constructor(private authService:AuthService, private router:Router , private ngZone:NgZone){

    this.authService.getUserClaims().then((u)=>
    {
      this.user = u;
      console.log(this.user.displayName);
      console.log(this.user.photoURL);

    })

  }
  tryLogout(): void
  {
    this.authService.doLogout().then(()=>{this.successRedirect()})
  }

  successRedirect(): void
  {
    this.ngZone.run(()=>this.router.navigate([ '/login']));
  }

  ngOnInit(): void {

  }


}
