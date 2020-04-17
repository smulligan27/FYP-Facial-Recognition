import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource } from '@capacitor/core';
import { faceapi } from './face-api.min.js'
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx'
import { Platform, LoadingController } from '@ionic/angular'
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'
import { finalize } from 'rxjs/operators';
import {AlertService} from 'src/app/services/alert.service';
import { database } from 'firebase';
import { Observable } from 'rxjs';
//import {Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { from } from 'rxjs';
const { Camera, Filesystem, Storage } = Plugins;

declare var faceapi;

export interface CData {
  name: string;
  password: string;
}

export interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.page.html',
  styleUrls: ['./contractor.page.scss'],
})
export class ContractorPage implements OnInit {

  UploadedFileURL: Observable<string>;
  pathList: any;
  name: string = '';
  password: string = '';
  login: string = 'Test27'
  currentImage: any = [];
  filepath: string = '';
  imagename: string = '';
  size: number;
  private contractorCollection: AngularFirestoreCollection;
  constructor(
    private loadingController: LoadingController,
    private storage: AngularFireStorage,
    public router: Router, 
    private database: AngularFirestore,
    public alert:AlertService,
    private crudService: CrudService, 
    private http: HttpClient, 
    private nativeHttp: HTTP, 
    private plt: Platform ) { 
  }

  ngOnInit() {
  }

  log(){
    const { password } = this;
    if (password == this.login){
      this.router.navigate(['/home/tabs/contractor/schedule'])
    }
  }
  public async takeImage() {
    const { name } = this;
    // const path = `${name}/1.jpg`;
    // const fileRef = this.storage.ref(path);
    // const img = this.UploadedFileURL = fileRef.getDownloadURL();
    const path = `${name}/1.jpg`;
    const fileRef = this.storage.ref(path);
    this.UploadedFileURL = fileRef.getDownloadURL();
    this.UploadedFileURL.subscribe(resp=>{
      console.log(resp)
      //const LabeledFaceDescriptors = loadLabeledImages(resp)
    })
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    })
    console.log(capturedPhoto.base64String)
    
    Promise.all([
      await faceapi.nets.ssdMobilenetv1.loadFromUri('https://www.techbuildz.com/models'),
      await faceapi.nets.faceLandmark68Net.loadFromUri('https://www.techbuildz.com/models'),
      await faceapi.nets.faceRecognitionNet.loadFromUri('https://www.techbuildz.com/models')
    ]).then(start)
    async function start(img) {
      //const labeledFaceDescriptors = await loadLabeledImages()
      // const path = `${name}/1.jpg`;
      // const fileRef = this.storage.ref(path);
      // const img = this.UploadedFileURL = fileRef.getDownloadURL();
      const photo = faceapi.fetchImage('https://firebasestorage.googleapis.com/v0/b/final-year-project-f5b9d.appspot.com/o/sean%20curran%2F3.jpg?alt=media&token=fdedad1d-41e2-442a-98e5-41ed4441bb55')
      const detection = faceapi.detectSingleFace(photo).withFaceLandmarks().withFaceDescriptor()
      const descriptions =[
        new Float32Array(detection.descriptor)
      ]
      const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(name, descriptions )
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
      let image = capturedPhoto
      //image = await faceapi.bufferToImage(capturedPhoto)
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections)
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      if (results >= 0.6){
        this.router.navigate(['/home/tabs/contractor/schedule'])
      }
    }
    // function loadLabeledImages() {
    //   //const descriptions = []
    //   // for (let i = 1; i <= 4; i++) {
    //   //   // let img = this.nativeHttp.get(`https://console.firebase.google.com/project/final-year-project-f5b9d/storage/final-year-project-f5b9d.appspot.com/files/${name}/${i}.jpg`)
    //   //   // firebase.storage().ref().child().getDownloadURL()
    //   //   // .then(response => this.someTextUrl = response)
    //   //   // .catch(error => console.log('error', error))
    //   //   const img = faceapi.fetchImage('https://firebasestorage.googleapis.com/v0/b/final-year-project-f5b9d.appspot.com/o/sean%20curran%2F3.jpg?alt=media&token=fdedad1d-41e2-442a-98e5-41ed4441bb55')
    //   //   const detections = faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    //   //   descriptions.push(detections.descriptor)
    //   //   }
    //   const path = `${name}/1.jpg`;
    //   const fileRef = this.storage.ref(path);
    //   const img = this.UploadedFileURL = fileRef.getDownloadURL();
    //   const photo = faceapi.fetchImage(img)
    //   const detections = faceapi.detectSingleFace(photo).withFaceLandmarks().withFaceDescriptor()
    //   const descriptions =[
    //     new Float32Array(detections.descriptor)
    //   ]
    //   return new faceapi.LabeledFaceDescriptors(name, descriptions )
      //descriptions.push(detections.descriptor)
      // const labeledDescriptors = [
      //   return new faceapi.LabeledFaceDescriptors(name, descriptions )
      // ]
      //return new faceapi.LabeledFaceDescriptors(name, descriptions)
   // }
  }
  }

// https://cors-anywhere.herokuapp.com/
// return storageRef.getDownloadURL().toPromise().then(res => {
//   console.log('URL: ', res);
//   return res;
// });


// const descriptorsObama = [
//   new Float32Array(results[0].descriptor)
// ]

// const labeledDescriptors = [
//   new faceapi.LabeledFaceDescriptors('obama', descriptorsObama )
// ]