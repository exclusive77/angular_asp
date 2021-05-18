import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }
  DepartamentFilterId:string="";
  DepartamentFilterName:string="";
  DepartamentListFilterName:any=[];

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
   this.DepartamentListFilterName=data;
  })
}
FilterFn(){
  var  DepartamentFilterId=this.DepartamentFilterId;
  var DepartamentFilterName=this.DepartamentFilterName;
  this.DepartamentList=this.DepartamentListFilterName.filter(function(el:any){
    return el.DepartamentId.toString().toLowerCase().includes(
      DepartamentFilterId.toString().trim().toLowerCase()
    )&&
      el.DepartamentName.toString().toLowerCase().includes(
        DepartamentFilterName.toString().trim().toLowerCase())

    
  });
}
sortResult(prop:string,asc:boolean){
  this.DepartamentList=this.DepartamentListFilterName.sort(function(a:any,b:any)
  {
if(asc){
return(a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0)
}
else{
  return(b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0)
}
  })

}

}


