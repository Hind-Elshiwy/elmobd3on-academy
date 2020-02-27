import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/authentication/user.service';


@Component({
  selector: 'app-admin-servises',
  templateUrl: './admin-servises.component.html',
  styleUrls: ['./admin-servises.component.css']
})
export class AdminServisesComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
      this.userService.getAll().pipe(first()).subscribe(users => { 
          console.log(users)
          this.users = users; 
      });
  }

}
