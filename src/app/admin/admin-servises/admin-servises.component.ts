import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/authentication/user.service';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component'

@Component({
  selector: 'app-admin-servises',
  templateUrl: './admin-servises.component.html',
  styleUrls: ['./admin-servises.component.css']
})
export class AdminServisesComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

}
