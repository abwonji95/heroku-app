import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { KioskService } from '../../services/kiosk.service'
import { LocationService } from 'src/app/services/location.service';
import { LOCATION } from 'src/app/interfaces/location'
import { KIOSK, KIOSKCLASS } from 'src/app/interfaces/kiosk';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.css']
})
export class KioskComponent implements OnInit {

  displayedColumns: string[] = ['id', 'kioskname', 'location', 'kioskaddress', 'macaddress', 'edit', 'delete'];
  dataSource: any;

  showAdd: boolean = false
  showUpdate: boolean = false
  showCard: boolean = false
  showCloseWindow: boolean = false
  message: string = ''

  id: number = 1;


  kiosknameFormControl = new FormControl('', [Validators.required]);
  locationFormControl = new FormControl('', [Validators.required]);
  kioskaddressFormControl = new FormControl('', [Validators.required]);
  macaddressFormControl = new FormControl('', [Validators.required]);


  inputFormControl = new FormControl('', [Validators.required]);


  form: FormGroup;

  kiosks: KIOSK[] = [];
  locations: LOCATION[] = [];
  @Input() kiosk: KIOSK | undefined;
  @Output() onDeleteKiosk: EventEmitter<KIOSK> = new EventEmitter()
  Obj: KIOSKCLASS = new KIOSKCLASS();
  showAddButton: boolean = true;
  searchKey: any;


  constructor(private kioskService: KioskService, private locationService: LocationService,
    private formBuilder: FormBuilder, public httpClient: HttpClient ) {
    this.form = this.formBuilder.group({
      locations: ['']
    });
    of(this.locationService.getLocation().subscribe((location) => {
      this.locations = location;
    }));
    of(this.kioskService.get().subscribe((kiosk) => {
      this.kiosks = kiosk;
    }));

  }

  ngOnInit() {

    this.kioskService.get().subscribe((kiosk) => {
      this.kiosks = kiosk;



    });
    this.locationService.getLocation().subscribe((location) => this.locations = location);
    this.form = this.formBuilder.group({

      kioskname: [''],
      location: [''],
      macaddress: [''],
      kioskaddress: ['']


    })


  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }





  deleteKiosk(k: KIOSK) {
    this.kioskService.delete(k).subscribe(() => (this.kiosks = this.kiosks.filter((t) => t.id !== k.id)));
    this.getAllKiosk();
  }

  createKiosk(kiosk: KIOSK) {

    this.kioskService.create(kiosk).subscribe((kiosk) => (this.kiosks.push(kiosk)));
    this.getAllKiosk();

  }

  onDelete(k: KIOSK) {
    console.log(k)
    this.kioskService.delete(k).subscribe(() => (this.kiosks = this.kiosks.filter((t) => t.id !== k.id)));
    alert("Record Deleted Succesfully");
    this.getAllKiosk();
  }

  getAllKiosk() {
    this.kioskService.get().subscribe(a => {
      this.kiosks = a;

    })

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


  updateKiosk(row: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.showCard = true;

    this.Obj.id = row.id;
    this.form.controls['kioskname'].setValue(row.kioskname);
    this.form.controls['location'].setValue(row.location);
    this.form.controls['kioskaddress'].setValue(row.kioskaddress);
    this.form.controls['macaddress'].setValue(row.macaddress);


  }

  updateKioskDetails() {
    this.Obj.kioskname = this.form.value.kioskname;
    this.Obj.location = this.form.value.location;
    this.Obj.kioskaddress = this.form.value.kioskaddress;
    this.Obj.macaddress = this.form.value.macaddress;

    this.kioskService.update(this.Obj, this.Obj.id).subscribe(data => {
      alert("Record updated Succesfully");
      this.form.reset();
      this.getAllKiosk();
      this.closeWindow();
    }, error => {
      this.message = error.error.kiosk
      alert(this.message)
    })
  }

  postKioskDetails() {
    this.Obj.id = this.form.value.id;
    this.Obj.kioskname = this.form.value.kioskname;
    this.Obj.location = this.form.value.location;
    this.Obj.macaddress = this.form.value.macaddress;
    this.Obj.kioskaddress = this.form.value.kioskaddress;

    this.kioskService.create(this.Obj).subscribe(data => {
      alert("Record Created successfully");
      this.form.reset();
      this.getAllKiosk();
      this.closeWindow();
    }, error => {
      if (error.error.kioskname) {
        this.message = error.error.kioskname
        alert(this.message)
      }
      else if (error.error.location) {
        this.message = error.error.location
        alert(this.message)
      }
      else if (error.error.kioskaddress) {
        this.message = error.error.kioskaddress
        alert(this.message)
      }
      else if (error.error.macaddress) {
        this.message = error.error.macaddress
        alert(this.message)
      }
      else {
        alert("Unknown Exception Error.")
      }


    })
  }
}


