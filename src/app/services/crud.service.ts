import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(

    private firestore: AngularFirestore
  
  ) { }
 
  //reads jobs from the collection jobs
  read_jobs() {
    return this.firestore.collection('jobs').snapshotChanges();
  }

  //updates the collection jobs
  update_job(recordID,record){
    this.firestore.doc('jobs/' + recordID).update(record);
  }

  //deletes record from collection jobs
  delete_job(record_id) {
    this.firestore.doc('jobs/' + record_id).delete();
  }

  //reads collection carpenters
  read_carpenters() {
    return this.firestore.collection('carpenter').snapshotChanges();
  }

  //updates record in carpenters
  update_carpenter(recordID,record){
    this.firestore.doc('carpenter/' + recordID).update(record);
  }

  //deletes record in carpenters
  delete_carpenter(record_id) {
    this.firestore.doc('carpenter/' + record_id).delete();
  }

  //reads collection plumbers
  read_plumbers() {
    return this.firestore.collection('plumber').snapshotChanges();
  }

  //updates record in plumbers
  update_plumber(recordID,record){
    this.firestore.doc('plumber/' + recordID).update(record);
  }

  //deletes record in plumber
  delete_plumber(record_id) {
    this.firestore.doc('plumber/' + record_id).delete();
  }

  //reads collection block layer
  read_blocklayers() {
    return this.firestore.collection('blocklayer').snapshotChanges();
  }

  //updates record in block layer
  update_blocklayer(recordID,record){
    this.firestore.doc('blocklayer/' + recordID).update(record);
  }

  //deletes record in block layer
  delete_blocklayer(record_id) {
    this.firestore.doc('blocklayer/' + record_id).delete();
  }

  //reads collection electrician
  read_electricians() {
    return this.firestore.collection('electrician').snapshotChanges();
  }

  //updates record in electrician
  update_electrician(recordID,record){
    this.firestore.doc('electrician/' + recordID).update(record);
  }

  //deletes reccord in electrician
  delete_electrician(record_id) {
    this.firestore.doc('electrician/' + record_id).delete();
  }

  //reads collection of images
  read_images() {
    return this.firestore.collection('contractorImages').snapshotChanges();
  }
}
