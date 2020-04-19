import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';

//exports all the inputs from the form
export interface CData {
  jobname: string;
  startdate: string;
  enddate: string;
  time: string;
  location: string;
  materials: string;
  carpenter: string;
  blocklayer: string;
  electrician: string;
  plumber: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  jobsList: any;
  jobname: string;
  startdate: string;
  enddate: string;
  time: string;
  location: string;
  materials: string;
  carpenter: string;
  blocklayer: string;
  electrician: string;
  plumber: string;

  constructor(

    private crudService: CrudService, 
    public router: Router
    
    ) { }

  ngOnInit() {

    //reads in all the jobs to the list and puts them in a list to be displayed by the html
    this.crudService.read_jobs().subscribe(data => {
 
      this.jobsList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          jobname: e.payload.doc.data()['jobname'],
          startdate: e.payload.doc.data()['startdate'],
          enddate: e.payload.doc.data()['enddate'],
          time: e.payload.doc.data()['time'],
          location: e.payload.doc.data()['location'],
          materials: e.payload.doc.data()['materials'],
          carpenter: e.payload.doc.data()['carpenter'],
          blocklayer: e.payload.doc.data()['blocklayer'],
          electrician: e.payload.doc.data()['electrician'],
          plumber: e.payload.doc.data()['plumber'],
        };
      })
      console.log(this.jobsList);
 
    });
  }

  //edits the record of the selected card
  EditRecord(record) {
    record.isEdit = true;
    record.Editenddate = record.enddate;
    record.Edittime = record.time;
    record.Editlocation = record.location;
    record.Editmaterials = record.materials;
    record.Editcarpenter = record.carpenter;
    record.Editblocklayer = record.blocklayer;
    record.Editelectrician = record.electrician;
    record.Editplumber = record.plumber;
  }
  
  //updates the record of the selected card
  UpdateRecord(recordRow) {
    let record = {};
    record['enddate'] = recordRow.Editenddate;
    record['time'] = recordRow.Edittime;
    record['location'] = recordRow.Editlocation;
    record['materials'] = recordRow.Editmaterials;
    record['carpenter'] = recordRow.Editcarpenter;
    record['blocklayer'] = recordRow.Editblocklayer;
    record['electrician'] = recordRow.Editelectrician;
    record['plumber'] = recordRow.Editplumber;
    this.crudService.update_job(recordRow.id, record);
    recordRow.isEdit = false;
  }
  
  //deletes the record of the selected card
  RemoveRecord(rowID) {
    this.crudService.delete_job(rowID);
  }
}
