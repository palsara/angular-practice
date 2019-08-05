import { Component, OnInit, Input, Output } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { MockData } from 'src/app/model/mock-data';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  };
  md: MockData = new MockData();
  employees: Employee[] = [this.md.employee[0], this.md.employee[1], this.md.employee[2], this.md.employee[3], this.md.employee[4]];
  header: string = 'Employee';

}
