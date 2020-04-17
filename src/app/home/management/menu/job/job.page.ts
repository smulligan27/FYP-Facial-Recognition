import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { database } from 'firebase';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';

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
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  carpetList: any;
  blockList: any;
  plumbList: any;
  electricList: any;
  jobname: string = '';
  startdate: string = '';
  enddate: string = '';
  time: string = '';
  location: string = '';
  materials: string = '';
  carpenter: string = '';
  blocklayer: string = '';
  electrician: string = '';
  plumber: string = '';

  private contractorCollection: AngularFirestoreCollection;
  private jobCollection: AngularFirestoreCollection<CData>;

  constructor(private db: AngularFirestore,public router: Router, private crudService: CrudService) { 
    this.jobCollection = db.collection<CData>('jobs');
    this.contractorCollection = db.collection('contractors');

  }

  ngOnInit() {
    this.crudService.read_carpenters().subscribe(data => {
      this.carpetList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.carpetList);
 
    });

    this.crudService.read_plumbers().subscribe(data => {
      this.plumbList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.plumbList);
 
    });

    this.crudService.read_blocklayers().subscribe(data => {
      this.blockList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.blockList);
 
    });

    this.crudService.read_electricians().subscribe(data => {
      this.electricList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.electricList);
 
    });
  }

  job(){
    const { jobname, startdate, enddate, time, location, materials, carpenter, blocklayer, electrician, plumber } = this;
    this.jobCollection.add({
      jobname: jobname,
      startdate: startdate,
      enddate: enddate,
      time: time,
      location: location,
      materials: materials,
      carpenter: carpenter,
      blocklayer: blocklayer,
      electrician: electrician,
      plumber: plumber
    })
    .then(function(){
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });     

  }

  list(){
    this.router.navigate(['/home/tabs/management/menu/job/list'])
  }
}
