import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIurl="http://localhost:5000/api";
readonly Photosurl="http://localhost:5000/Photos";
  constructor(private http:HttpClient) { }
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIurl+'/Departament');
  }
  addDepartament(val:any){
    return this.http.post<any[]>(this.APIurl+'/Departament',val);

  }
  updateDepartament(val:any){
    
    return this.http.put<any[]>(this.APIurl+'/Departament',val);
    
  }
  deleteDepartament(val:any){

    return this.http.delete<any[]>(this.APIurl+'/Departament/'+val);
    
  }

  getAllDepartamentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIurl+'/Employee/GetAllDepartamentNames');
  }
  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.APIurl+'/Employee');
  }
  addEmployee(val:any){
    return this.http.post<any[]>(this.APIurl+'/Employee',val);

  }
  updateEmployee(val:any){
    return this.http.put<any[]>(this.APIurl+'/Employee',val);
    
  }
  deleteEmployee(val:any){
    return this.http.delete<any[]>(this.APIurl+'/Employee/'+val);
    
  }
  UploadPhoto(val:any){
    return this.http.post<any[]>(this.APIurl+'/Employee/SaveFile',val);

  }
}
