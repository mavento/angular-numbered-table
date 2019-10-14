import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {PeriodicElement} from "../model/periodic-element";
import {PeriodicElementService} from "../service/periodic-element.service";

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selectedRowIndex: number;
  upDisabled: boolean;
  downDisabled: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private periodicElementService: PeriodicElementService) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.upDisabled = true;
    this.downDisabled = true;
    this.getBooks();
  }

  moveUp() {
    let index = this.selectedRowIndex;
    if (index > 0) {
      let tmp = this.dataSource.data[index];
      this.periodicElementService.update(index - 1, 'position', tmp.position);
      this.periodicElementService.update(index, 'position', tmp.position - 1);
      this.select(index - 1);
      this.getBooks();
    }
  }

  moveDown() {
    let index = this.selectedRowIndex;
    if (index < this.dataSource.data.length) {
      let tmp = this.dataSource.data[index];
      this.periodicElementService.update(index + 1, 'position', tmp.position);
      this.periodicElementService.update(index, 'position', tmp.position + 1);
      this.select(index + 1);
      this.getBooks();
    }
  }

  select(index: number) {
    this.selectedRowIndex = index;
    this.upDisabled = index === 0 ? true : false;
    this.downDisabled = index === this.dataSource.data.length - 1 ? true : false;
  }

  private getBooks() {
    this.dataSource.data = this.periodicElementService.list;
  }
}
