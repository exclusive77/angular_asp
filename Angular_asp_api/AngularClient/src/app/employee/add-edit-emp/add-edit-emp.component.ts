import { Component, Input, OnInit } from '@angular/core';

import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  
  @Input ()emp:any;
 
  EmployeeId:number | undefined;
  EmployeeName:string | undefined;
  Departament:string | undefined;
  DataOfJoining:string | undefined;
  PhotoFileName:string | undefined;
  PhotoFilePath:string | undefined;
    ngOnInit(): void {
      this.loadDapartamentList()
     
    }
    DapartamentList:any[] | undefined;
    loadDapartamentList(){
      this.service.getAllDepartamentNames().subscribe((data:any)=>{
        this.DapartamentList=data;
       this.EmployeeId=this.emp.EmployeeId,
        this.EmployeeName=this.emp.EmployeeName,
        this.Departament =this.emp.Departament,
         this. DataOfJoining=this.emp.DataOfJoining,
        this.PhotoFileName=this.emp.PhotoFileName,
        this. PhotoFilePath=this.service.Photosurl+this.PhotoFileName;
      });
    }
    addEmployee(){
  var val={
    EmployeeId:this.EmployeeId,
    EmployeeName:this.EmployeeName,
    Departament:this.Departament,
    DataOfJoining:this.DataOfJoining,
    PhotoFileName:this.PhotoFileName,
  
  };
  this.service.addEmployee(val).subscribe(res=>{alert(res.toString())});
    }
    updateEmployee(){
      var val={
        EmployeeId:this.EmployeeId,
       EmployeeName:this.EmployeeName,
        Departament:this.Departament,
         DataOfJoining:this.DataOfJoining,
       PhotoFileName:this.PhotoFileName,
       
      };
      this.service.updateEmployee(val).subscribe(res=>{alert(res.toString())});
        }
 
    uploadPhoto(event:any){
      var file=event.target.files[0];
      const formData:FormData=new FormData();
      formData.append('uploadedFile',file,file.name);
this.service.UploadPhoto(formData).subscribe((data:any)=>{
this.PhotoFileName=data.toString();
this.PhotoFilePath=this.service.Photosurl+this.PhotoFileName;
})

    }
  
  }

