import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileSizeFormatPipe } from './file-size-format.pipe';
 

export interface MyData {
  imagename: string;
  filepath: string;
  size: number;
}

export interface CData {
  name: string;
  contactNumber: string;
  skill: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  name: string = '';
  contactNumber: string = '';
  skill: string = '';

  // Upload Task 
  task: AngularFireUploadTask;
 
  // Progress in percentage
  percentage: Observable<number>;
 
  // Snapshot of uploading file
  snapshot: Observable<any>;
 
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
 
  //Uploaded Image List
  images: Observable<MyData[]>;
 
  //File details  
  fileName:string;
  fileSize:number;
 
  //Status check 
  isUploading:boolean;
  isUploaded:boolean;

  private imageCollection: AngularFirestoreCollection<MyData>;
  private contractorCollection: AngularFirestoreCollection<CData>;
  constructor(private http: HttpClient, private storage: AngularFireStorage, private database: AngularFirestore) { 
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('contractorImages');
    this.contractorCollection = database.collection<CData>('contractors');
    this.images = this.imageCollection.valueChanges();
  }

  uploadFile(event: FileList) {
    
 
    // The File object
    const file = event.item(0)
    const {name} = this;
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;
 
 
    this.fileName = file.name;
 
    // The storage path
    const path = `${name}/${file.name}`;
    
    
 
    // Totally optional metadata
    const customMetadata = { app: 'Contractor Image Upload Demo' };
 
    //File reference
    const fileRef = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
    
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            imagename: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);

        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }
 
  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();
 
    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }
  
  ngOnInit() {
  }

  register() {
    const { name, contactNumber, skill } = this;
    this.contractorCollection.add({
      name: name,
      contactNumber: contactNumber,
      skill: skill
    })
    .then(function(){
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });     
  }
}