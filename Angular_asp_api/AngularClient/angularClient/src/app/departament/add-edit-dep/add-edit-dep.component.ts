import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service:SharedService) { }
@Input ()dep:any;
DepartamentId:number | undefined;
DepartamentName:string | undefined;
  ngOnInit(): void {
    this.DepartamentId=this.dep.DepartamentId;
    this.DepartamentName=this.dep.DepartamentName;

  }
  addDeportament(){
var val={
  DepartamentId:this.DepartamentId,
  DepartamentName:this.DepartamentName
};
this.service.addDepartament(val).subscribe(res=>{alert(res.toString())});
  }
  updateDeportament(){
    var val={
      DepartamentId: this.DepartamentId,
      DepartamentName:this.DepartamentName
    };
    this.service.updateDepartament(val).subscribe(res=>{alert(res.toString())});
      }
  }

