import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { database } from 'firebase';

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
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  jobname: string = '';
  date: string = '';
  time: string = '';
  location: string = '';
  materials: string = '';
  carpenter: string = '';
  blocklayer: string = '';
  electrician: string = '';
  plumber: string = '';

  private contractorCollection: AngularFirestoreCollection;
  private jobCollection: AngularFirestoreCollection<CData>;

  constructor(private db: AngularFirestore) { 
    this.jobCollection = db.collection<CData>('jobs');
    this.contractorCollection = db.collection('contractors');

    // db.collection("contractors").where("capital", "==", true)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
  }

  ngOnInit() {
    
  }

  job(){
    const { jobname, date, time, location, materials, carpenter, blocklayer, electrician, plumber } = this;
    this.jobCollection.add({
      jobname: jobname,
      date: date,
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

}
