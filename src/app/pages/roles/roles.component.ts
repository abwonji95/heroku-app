import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RoleService} from '../../services/role.service'
import { ROLE, ROLECLASS} from 'src/app/interfaces/role'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';



@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {


  displayedColumns = ['id','name','edit','delete']
  nameFormControl = new FormControl('', [Validators.required]);

  form!:FormGroup;

  dataSource: any;
  searchKey: any;

  showAdd:boolean=false
  showUpdate:boolean=false
  showCard:boolean=false
  showCloseWindow:boolean=false
  showAddButton=true
  message:string='';

  id!:number;
  name:string='';

  roles: ROLE[]=[];
  Obj:ROLECLASS=new ROLECLASS()

  @Input() role:ROLE | undefined;
  @Output() onDeleteRole:EventEmitter<ROLE>= new EventEmitter()

  constructor(private roleService:RoleService,private formBuilder: FormBuilder) {
    of(this.roleService.get().subscribe((role)=>{
      this.roles}));
      this.form = this.formBuilder.group({
        roles: [''],});

  }


  addNew(){
    this.showUpdate=false;
    this.showAdd=true;
    this.showCard=true;
    this.showCloseWindow=true;
    this.showAddButton=false;
  }

  closeWindow(){
    this.showUpdate=false;
    this.showAdd=false;
    this.showCard=false;
    this.showAddButton=true;
    this.showCloseWindow=false;
  }


  ngOnInit(): void {
    this.roleService.get().subscribe((role)=>{
      this.roles=role;

    });
    this.form = this.formBuilder.group({
      name:[''],
      roles: [''],});


  }
  getAllRoles(){
    this.roleService.get().subscribe((t)=>{
      this.roles=t;

    });
  }

  updateRoles(row:any){
    this.showUpdate=true;
    this.showAdd=false;
    this.showCard=true;
    this.showAddButton=false;
    this.showCloseWindow=true;

    this.Obj.id=row.id;
    this.form.controls['name'].setValue(row.name);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }



  updateRoleDetails(){
    this.Obj.name=this.form.value.name;

    this.roleService.update(this.Obj,this.Obj.id).subscribe(data=>{
      alert("Record updated Succesfully");
      this.form.reset();
      this.getAllRoles();
      this.closeWindow();
    },error=>{
      this.message=error.error.name
      alert(this.message)
    })
  }

  postRoleDetails(){
    this.Obj.name=this.form.value.name;

      this.roleService.create(this.Obj).subscribe(data=> {
        alert("Record Created successfully");
        this.form.reset();
        this.getAllRoles();
        this.closeWindow();
      },error=>{
        this.message=error.error.name
      alert(this.message)
      })
     }




deleteRoles(role:ROLE){
  this.roleService.delete(role).subscribe(()=>(this.roles=this.roles.filter((t)=>t.id !== role.id)));
}



  onDelete(role:ROLE){
    this.roleService.delete(role).subscribe(()=>(this.roles=this.roles.filter((t)=>t.id !== role.id)));
    alert("Record Deleted Succesfully");
    this.getAllRoles();
  }

}

