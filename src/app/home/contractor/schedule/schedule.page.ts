import { Component, OnInit ,Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { database } from 'firebase';
import { Observable } from 'rxjs';

export interface CData {
  jobname: string;
  date: string;
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
  //jobsList: any;
  
  jobsCollection: AngularFirestoreCollection<CData>;
  jobs: Observable<CData[]>;

  constructor(private db: AngularFirestore) {
  //   this.getJobsList().then( function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // }) 
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });

        this.jobsCollection = this.db.collection('jobs')
        this.jobs = this.jobsCollection.valueChanges()
   }

  ngOnInit() {
    //this.jobsList = this.getJobsList();
  }

  // getJobsList() {
  //   return firebase.firestore().collection('jobs').get();
  // }
  
}
//jobs => this.jobsList = jobs
//private jobCollection: AngularFirestoreCollection<CData>;
  //jobsList: any[];
   //this.jobCollection = db.collection<CData>('jobs');