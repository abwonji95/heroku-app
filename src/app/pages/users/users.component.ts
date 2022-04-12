import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { LOCATION } from 'src/app/interfaces/location';
import { ROLE } from 'src/app/interfaces/role';
import { USER, USERCLASS } from 'src/app/interfaces/users';
import { KioskService } from 'src/app/services/kiosk.service';
import { LocationService } from 'src/app/services/location.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns = ['id', 'date', 'fullname', 'username', 'mobile', 'email', 'role']
  message: [] = [];

  id!: number;
  username: string = '';
  password: string = '';
  email: string = '';
  first_name: string ='';
  last_name: string = '';
  mobile: string = '';
  department: string = '';
  role: string = '';
  location: string = '';
  is_verified: boolean = false;
  is_active: boolean = false;
  is_staff: boolean = false;
  date_created: string = '';
  date_updated: string = '';



  users: USER[] = []
  roles: ROLE[] = []
  locations: LOCATION[] = []


  dataSource: any;
  searchKey: any;

  Obj: USERCLASS = new USERCLASS()

  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  first_nameFormControl = new FormControl('', [Validators.required]);
  last_nameFormControl = new FormControl('', [Validators.required]);
  mobileFormControl = new FormControl('', [Validators.required]);
  departmentFormControl = new FormControl('', [Validators.required]);
  roleFormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);

  form!: FormGroup;


  showAdd: boolean = false
  showUpdate: boolean = false
  showCard: boolean = false
  showCloseWindow: boolean = false
  showAddButton = true

  constructor( private formBuilder: FormBuilder, private roleService: RoleService, private locationService: LocationService, private userService: UserService) {
    of(this.userService.get().subscribe((user) => {
      this.users = user;

    }));
    of(this.roleService.get().subscribe((role) => {
      this.roles = role;
    }));

    of(this.locationService.getLocation().subscribe((loc) => {
      this.locations = loc;
    }));
    this.form = this.formBuilder.group({
      roles: [''],
      users: [''],
      departments: [''],
      locations: [''],
    });

  }

  addNew() {
    this.showUpdate = false;
    this.showAdd = true;
    this.showCard = true;
    this.showCloseWindow = true;
    this.showAddButton = false;
  }

  closeWindow() {
    this.showUpdate = false;
    this.showAdd = false;
    this.showCard = false;
    this.showAddButton = true;
    this.showCloseWindow = false;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

convertMobile(a:any){
  var mobile='';
  if (a){
    for (let i=1;i<=a.length-2;i++){
      mobile+="*";
    }
    return mobile + a.slice(8,10);
  }
  else{
    return null;
  }

}

convertEmail(a:any){
  var userMail='';
  if (a){
    for (let i=1;i<=a.length-2;i++){
      userMail+="*";
    }
    return  a.slice(0,10)+ userMail ;
  }
  else{
    return null;
  }

}

  getAllUsers() {
    this.userService.get().subscribe((t) => {
      this.users = t;

    });
  }

  updateUser(row: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.showCard = true;
    this.showAddButton = false;
    this.showCloseWindow = true;



    this.Obj.id = row.id;
    this.form.controls['username'].setValue(row.username);
    this.form.controls['first_name'].setValue(row.first_name);
    this.form.controls['last_name'].setValue(row.last_name);
    this.form.controls['department'].setValue(row.department);
    this.form.controls['role'].setValue(row.role);
    this.form.controls['location'].setValue(row.location);
  }



  ngOnInit(): void {
    this.userService.get().subscribe((user) => {
      this.users = user;
      this.dataSource = this.users;
    });

    this.roleService.get().subscribe((role) => this.roles = role);
    this.getAllUsers();
    this.form = this.formBuilder.group({

      username: [''],
      email: [''],
      password: [''],
      first_name: [''],
      last_name: [''],
      mobile: [''],
      department: [''],
      role: [''],
      location: [''],



    });
  }



  updateUserDetails() {
    this.Obj.username = this.form.value.username;
    this.Obj.first_name = this.form.value.first_name;
    this.Obj.last_name = this.form.value.last_name;
    this.Obj.department = this.form.value.department;
    this.Obj.role = this.form.value.role;
    this.Obj.location = this.form.value.location;



    this.userService.update(this.Obj, this.Obj.id).subscribe(a => {
      alert("Record updated Succesfully");
      this.form.reset();
      this.getAllUsers();
      this.closeWindow();
    })
  }

  postUserDetails() {
    this.Obj.username = this.form.value.username;
    this.Obj.email = this.form.value.email;
    this.Obj.password = this.form.value.password;
    this.Obj.first_name = this.form.value.first_name;
    this.Obj.last_name = this.form.value.last_name;
    this.Obj.department = this.form.value.department;
    this.Obj.role = this.form.value.role;
    this.Obj.location = this.form.value.location;
    this.Obj.mobile = this.form.value.mobile;


  }










  onDelete(user: USER) {
    this.userService.delete(user).subscribe(() => (this.users = this.users.filter((t) => t.id !== user.id)));
    alert("Record Deleted successfully");
    this.getAllUsers();
  }

}


