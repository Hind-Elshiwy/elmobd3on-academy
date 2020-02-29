import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from '../admin.service';

export interface GuestData {
  number: string;
  name: string;
  email: string;
  message: string;
}

export interface OrderData {
  number: string;
  name: string;
  email: string;
  phone: string;
  data: boolean
}


@Component({
  selector: 'app-admin-guests',
  templateUrl: './admin-guests.component.html',
  styleUrls: ['./admin-guests.component.css']
})
export class AdminGuestsComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'email', 'message'];
  dataSource: MatTableDataSource<GuestData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  guests: any
  constructor(private adminService: AdminService ) {
  }

  ngOnInit() {
    // Create 100 users
    this.adminService.getGuests().subscribe(res => {
      this.guests = res
      // Assign the data to the data source for the table to render
      const users = Array.from({length: this.guests.length}, (_, k) => this.createNewUser(k + 1));
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Builds and returns a new User. */
  createNewUser(num: number): GuestData {
    let guest = this.guests[num-1],
        {firstName, lastName, email, message} = guest,
        name = firstName + " " + lastName
    return {
      number: num.toString(),
      name,
      email,
      message
    };
  }
}
