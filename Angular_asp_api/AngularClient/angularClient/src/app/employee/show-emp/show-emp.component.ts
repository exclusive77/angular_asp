import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  ModalTitle:string | undefined;
  EmployeeList:any=[];
 emp:any;
 ActiveteAddEditEmp:boolean =false;
  ngOnInit(): void {
    this.refreschEmpList();
  }
  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Departament:" ",
      DataOfJoining:" ",
      PhotoFileName:"anonymous.png"
    }

    this.ModalTitle="Add Employee";
    this.ActiveteAddEditEmp=true;
  }
  closeClick(){
    this.ActiveteAddEditEmp=false;
    this.refreschEmpList();
  }
  editClick(item:any){
    this.emp=item;
   this.ModalTitle="Edit Employee";
    this.ActiveteAddEditEmp=true;
  }
  deleteClick(item:any){
    if(confirm ('Вы  уверены?')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{alert(data.toString())})
      this.refreschEmpList();
    }

  }
refreschEmpList(){
  this.service.getEmpList().subscribe(data=>{
    this.EmployeeList=data;
  })
}
}



