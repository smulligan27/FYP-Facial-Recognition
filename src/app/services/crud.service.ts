import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }
 
  read_jobs() {
    return this.firestore.collection('jobs').snapshotChanges();
  }

  update_job(recordID,record){
    this.firestore.doc('jobs/' + recordID).update(record);
  }

  delete_job(record_id) {
    this.firestore.doc('jobs/' + record_id).delete();
  }

  read_carpenters() {
    return this.firestore.collection('carpenter').snapshotChanges();
  }

  update_carpenter(recordID,record){
    this.firestore.doc('carpenter/' + recordID).update(record);
  }

  delete_carpenter(record_id) {
    this.firestore.doc('carpenter/' + record_id).delete();
  }

  read_plumbers() {
    return this.firestore.collection('plumber').snapshotChanges();
  }

  update_plumber(recordID,record){
    this.firestore.doc('plumber/' + recordID).update(record);
  }

  delete_plumber(record_id) {
    this.firestore.doc('plumber/' + record_id).delete();
  }

  read_blocklayers() {
    return this.firestore.collection('blocklayer').snapshotChanges();
  }

  update_blocklayer(recordID,record){
    this.firestore.doc('blocklayer/' + recordID).update(record);
  }

  delete_blocklayer(record_id) {
    this.firestore.doc('blocklayer/' + record_id).delete();
  }

  read_electricians() {
    return this.firestore.collection('electrician').snapshotChanges();
  }

  update_electrician(recordID,record){
    this.firestore.doc('electrician/' + recordID).update(record);
  }

  delete_electrician(record_id) {
    this.firestore.doc('electrician/' + record_id).delete();
  }

  read_images() {
    return this.firestore.collection('contractorImages').snapshotChanges();
  }
}
