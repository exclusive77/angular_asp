import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }
  ModalTitle:string | undefined;
 DepartamentList:any=[];
 dep:any;
 ActiveteAddEditDepComp:boolean =false;
  ngOnInit(): void {
    this.refreschDepList();
  }
  addClick(){
    this.dep={
      DepartamentId:0,
      DepartamentName:""
    }

    this.ModalTitle="Add Departament";
    this.ActiveteAddEditDepComp=true;
  }
  closeClick(){
    this.ActiveteAddEditDepComp=false;
    this.refreschDepList();
  }
  editClick(item:any){
    this.dep=item;
   this.ModalTitle="Edit Departament";
    this.ActiveteAddEditDepComp=true;
  }
  deleteClick(item:any){
    if(confirm ('Вы  уверены?')){
      this.service.deleteDepartament(item.DepartamentId).subscribe(data=>{alert(data.toString())})
      this.refreschDepList();
    }

  }
refreschDepList(){
  this.service.getDepList().subscribe(data=>{
    this.DepartamentList=data;
  })
}
}
