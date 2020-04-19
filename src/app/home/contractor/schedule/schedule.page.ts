import { Component, OnInit ,Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { database } from 'firebase';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'

//allows these values to be read from collection
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
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})

export class SchedulePage implements OnInit {
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
  
  jobsCollection: AngularFirestoreCollection<CData>;
  jobs: Observable<CData[]>;

  constructor(
    
    private db: AngularFirestore, 
    private crudService: CrudService, 
    public router: Router
    
    ) {

      this.jobsCollection = this.db.collection('jobs')
      this.jobs = this.jobsCollection.valueChanges()
   }

  ngOnInit() {

    //reads in the jobs from its collection
    this.crudService.read_jobs().subscribe(data => {
      //adds all the jobs and data to a list, list will be used to populate html
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
  
}