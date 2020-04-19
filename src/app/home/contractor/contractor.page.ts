import { Component, OnInit } from '@angular/core';
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

  constructor(

    private loadingController: LoadingController,
    private storage: AngularFireStorage,
    public router: Router, 
    private database: AngularFirestore,
    public alert:AlertService,
    private crudService: CrudService, 
    private http: HttpClient, 
    private nativeHttp: HTTP, 
    private plt: Platform
    
    ) { }

  ngOnInit() {
  }

  log(){

    //takes in the password entered to allow access to schedule
    const { password } = this;
    if (password == this.login){
      this.router.navigate(['/home/tabs/contractor/schedule'])
    } else if(password != this.login){
      this.alert.presentAlert("Error","Password","Wrong password was entered!");
    }

  }

  public async takeImage() {

    //originally had input of name to get to the location 
    //of the image stored and get the download url to access it
    //this url would of then been used for the fetchImage()
    const { name } = this;
    const path = `${name}/1.jpg`;
    const fileRef = this.storage.ref(path);
    this.UploadedFileURL = fileRef.getDownloadURL();
    this.UploadedFileURL.subscribe(resp=>{
      console.log(resp)
    })

    //Takes the data from the captured photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    })
    console.log(capturedPhoto.base64String)
    
    Promise.all([
      //reads in all the models needed for the api to perform the recognition
      await faceapi.nets.ssdMobilenetv1.loadFromUri('https://www.techbuildz.com/models'),
      await faceapi.nets.faceLandmark68Net.loadFromUri('https://www.techbuildz.com/models'),
      await faceapi.nets.faceRecognitionNet.loadFromUri('https://www.techbuildz.com/models')
    ]).then(start) // calls the function straight after image being taken

    async function start(img) {

      //was trying here to hard code in the image since it couldnt access it
      const photo = faceapi.fetchImage('https://firebasestorage.googleapis.com/v0/b/final-year-project-f5b9d.appspot.com/o/sean%20curran%2F3.jpg?alt=media&token=fdedad1d-41e2-442a-98e5-41ed4441bb55')
      
      //detects if the image supplied has a face in it and if so get the model of the face to be stored in a float32Array
      const detection = faceapi.detectSingleFace(photo).withFaceLandmarks().withFaceDescriptor()

      //appends the detections to a list
      const descriptions =[
        new Float32Array(detection.descriptor)
      ]

      //trying to take in the detections from the face already stored
      const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(name, descriptions )
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

      //was looking for the base 64 string but even with getting it here would not recognise it
      let image = capturedPhoto.base64String

      //supposed to take in blob and change it to be used 
      image = await faceapi.bufferToImage(capturedPhoto)
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections)

      //took the results of the two detections, then it was suppose to check them for a match and navigate
      //to schedule page if match 
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      if (results >= 0.6){
        this.router.navigate(['/home/tabs/contractor/schedule'])
      }
    }

    //function i was using to try and label the descriptions
    function loadLabeledImages() {

      //loops through images stored in database using dynamic variables ${name} and ${i}
      for (let i = 1; i <= 4; i++) {

        //tryed sending nativehttp calls to cure the cors problem which i faced for a long time
        let img1 = this.nativeHttp.get(`https://console.firebase.google.com/project/final-year-project-f5b9d/storage/final-year-project-f5b9d.appspot.com/files/${name}/${i}.jpg`)
        
        //trys to fetch the image also storedd in the cloud
        const img = faceapi.fetchImage('https://firebasestorage.googleapis.com/v0/b/final-year-project-f5b9d.appspot.com/o/sean%20curran%2F3.jpg?alt=media&token=fdedad1d-41e2-442a-98e5-41ed4441bb55')
        const detections = faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        }
    
      //sends detections from what was stored to faceapi.LabeledFaceDescriptors
      const image = faceapi.fetchImage('https://firebasestorage.googleapis.com/v0/b/final-year-project-f5b9d.appspot.com/o/sean%20curran%2F3.jpg?alt=media&token=fdedad1d-41e2-442a-98e5-41ed4441bb55')
      const detections = faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
      const descriptions =[
        new Float32Array(detections.descriptor)
      ]
      return new faceapi.LabeledFaceDescriptors(name, descriptions )
   }
  }
  }

