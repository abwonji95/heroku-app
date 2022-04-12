import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import { LocationService } from '../../services/location.service';
import { LOCATION, LOCATIONCLASS } from 'src/app/interfaces/location';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  displayedColumns = ['id', 'name', 'edit', 'delete'];
  locations: LOCATION[] = [];
  form!: FormGroup;

  dataSource: any;
  searchKey: any;
  message: string = '';

  showAdd: boolean = false;
  showUpdate: boolean = false;
  showCard: boolean = false;
  showCloseWindow: boolean = false;
  showAddButton = true;

  id!: number;
  name: string = '';
  Obj: LOCATIONCLASS = new LOCATIONCLASS();

  nameFormControl = new FormControl('', [Validators.required]);

  @Input() location: LOCATION | undefined;
  @Output() onDeleteLocation: EventEmitter<LOCATION> = new EventEmitter();

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    of(
      this.locationService.getLocation().subscribe((location) => {
        this.locations = location;
      })
    );
    this.form = this.formBuilder.group({
      locations: [''],
    });
  }

  ngOnInit(): void {
    this.locationService.getLocation().subscribe((location) => {
      this.locations = location;


    });
    this.form = this.formBuilder.group({
      name: [''],
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
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getAllLocations() {
    this.locationService.getLocation().subscribe((location) => {
      this.locations = location;

    });
  }

  updateLocation(row: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.showCard = true;
    this.showAddButton = false;
    this.showCloseWindow = false;

    this.Obj.id = row.id;
    this.form.controls['name'].setValue(row.name);
  }

  updateLocationDetails() {
    this.Obj.name = this.form.value.name;

    this.locationService.updateLocation(this.Obj, this.Obj.id).subscribe(
      (data) => {
        alert('Record updated Succesfully');
        this.form.reset();
        this.getAllLocations();
        this.closeWindow();
      },
      (error) => {
        this.message = error.error.name;
        alert(this.message);
      }
    );
  }

  postLocationDetails() {
    this.Obj.name = this.form.value.name;

    this.locationService.createLocation(this.Obj).subscribe(
      (data) => {
        alert('Record Created successfully');
        this.form.reset();
        this.getAllLocations();
        this.closeWindow();
      },
      (error) => {
        this.message = error.error.name;
        alert(this.message);
      }
    );
  }

  deleteLocation(location: LOCATION) {
    this.locationService
      .deleteLocation(location)
      .subscribe(
        () =>
          (this.locations = this.locations.filter((t) => t.id !== location.id))
      );
    alert('Record Deleted Succesfully');
    this.getAllLocations();
  }

  createLocation(location: LOCATION) {
    this.locationService
      .createLocation(location)
      .subscribe((location) => this.locations.push(location));
  }
  inputFormControl = new FormControl('', [Validators.required]);



  onDelete(location: LOCATION) {
    this.locationService
      .deleteLocation(location)
      .subscribe(
        () =>
          (this.locations = this.locations.filter((t) => t.id !== location.id))
      );
    alert('Record Deleted Succesfully');
    this.getAllLocations();
  }
}


