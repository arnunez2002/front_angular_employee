import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  constructor(private employeeService: EmployeeService){}
  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees (): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode:string):void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalToAdd( mode:string):void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }


  public onAddEmployee(addForm:NgForm): void{
     document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (Response: Employee)=> {
        console.log(Response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
        addForm.reset();
      },
    );
  }


  public onUpadteEmployee(employee: Employee): void{
   this.employeeService.updateEmployee(employee).subscribe(
     (Response: Employee)=> {
       console.log(Response);
       this.getEmployees();
     },
     (error: HttpErrorResponse)=> {
       alert(error.message);
     },
   );
 }

 public onDeleteEmployee(employeeId: number ): void{
  this.employeeService.deleteEmployee(employeeId).subscribe(
    (Response: void)=> {
      console.log(Response);
      this.getEmployees();
    },
    (error: HttpErrorResponse)=> {
      alert(error.message);
    },
  );
}

public searchEmployees(key: string): void {
  console.log(key);
  const results: Employee[] = [];
  for (const employee of this.employees) {
    if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.jobTittle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(employee);
    }
  }
  this.employees = results;
  if (results.length === 0 || !key) {
    this.getEmployees();
  }
}

}
