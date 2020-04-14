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
}
