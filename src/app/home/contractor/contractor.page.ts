import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource } from '@capacitor/core';
import { faceapi } from './face-api.min.js'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx'
import { Platform, LoadingController } from '@ionic/angular'
const { Camera, Filesystem, Storage } = Plugins;

declare var faceapi;

export interface CData {
  name: string;
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.page.html',
  styleUrls: ['./contractor.page.scss'],
})
export class ContractorPage implements OnInit {

  name: string = '';
  currentImage: any;
  private contractorCollection: AngularFirestoreCollection;
  constructor(
    private loadingctrl: LoadingController,
    private storage: AngularFireStorage, 
    private database: AngularFirestore, 
    private http: HttpClient, 
    private nativeHttp: HTTP, 
    private plt: Platform ) { 
    this.contractorCollection = database.collection('contractors');
  }

  ngOnInit() {
  }

  public async takeImage() {
    const { name } = this;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    //   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    //   faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    
    Promise.all([
      await faceapi.nets.ssdMobilenetv1.loadFromUri('https://www.techbuildz.com/models'),
      await faceapi.nets.faceLandmark68Net.loadFromUri('https://www.techbuildz.com/models'),
      await faceapi.nets.faceRecognitionNet.loadFromUri('https://www.techbuildz.com/models')
    ]).then(start)
    async function start() {
      const labeledFaceDescriptors = await loadLabeledImages()
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
      let image
      image = await faceapi.bufferToImage(capturedPhoto)
      const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections)
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      if (results >= 0.6){
        this.router.navigate(['/home/tabs/contractor/schedule'])
      }
    }
    function loadLabeledImages() {
      //const {name} = this;
      const descriptions = []
      for (let i = 1; i <= 4; i++) {
        // img = this.http.get()
        //const img = this.nativeHttp.get(`https://console.firebase.google.com/project/final-year-project-f5b9d/storage/final-year-project-f5b9d.appspot.com/files/${name}/${i}.jpg`, {}, {
          //'Content-Type': 'application/json'
        //}).pipe()
        const img = faceapi.fetchImage(`https://console.firebase.google.com/project/final-year-project-f5b9d/storage/final-year-project-f5b9d.appspot.com/files/${name}/${i}.jpg`)
        const detections = faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(name, descriptions)
    }
  }
}
