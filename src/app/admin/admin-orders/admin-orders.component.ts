import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from '../admin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

export interface OrderData {
  id: string;
  number: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  data: boolean;
}


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'email', 'phone', 'service', 'files'];
  dataSource: MatTableDataSource<OrderData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  fileUrl: any
  orders: any
  constructor(private adminService: AdminService, private sanitizer:DomSanitizer ) {
  }

  ngOnInit() {
    // Create 100 users
    this.adminService.getOrders().subscribe(res => {
      this.orders = res
      // Assign the data to the data source for the table to render
      const orders = Array.from({length: this.orders.length}, (_, k) => this.createNewOrder(k + 1));
      this.dataSource = new MatTableDataSource(orders);
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
  createNewOrder(num: number): OrderData {
    let order = this.orders[num-1],
        {id, firstName, lastName, email, phone, service, files} = order,
        name = firstName + " " + lastName,
        data = (files.length > 0);
    
    return {
      number: num.toString(),
      id,
      name,
      email,
      phone,
      service,
      data
    };
  }

  trial(id){
    this.adminService.getOrderFiles(id).subscribe(res => {
      let blob = new Blob([res], {
        type: 'application/zip'
      });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      let fileName = (new Date()).getTime()
      saveAs(blob, fileName)
    })
  }
}
