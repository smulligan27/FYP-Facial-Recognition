import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { HTTP } from '@ionic-native/http/ngx'
import { AuthenticateService } from './services/authentication.service';
import * as firebase from 'firebase';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [
    HTTP,
    StatusBar,
    AuthenticateService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouteReuseStrategy } from '@angular/router';

// import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage'
// import { AngularFireAuthModule } from '@angular/fire/auth'
// import { environment } from 'src/environments/environment';
// import { AngularFirestore } from '@angular/fire/firestore';
// import firebaseConfig from './firebase';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';

// @NgModule({
//   declarations: [AppComponent],
//   entryComponents: [],
//   imports: [
//     BrowserModule, 
//     HttpClientModule,
//     HttpModule, 
//     AngularFirestoreModule, 
//     AngularFireStorageModule, 
//     AngularFireAuthModule, 
//     AngularFireModule.initializeApp(firebaseConfig),
//     IonicModule.forRoot(), 
//     AppRoutingModule],
//   providers: [
//     StatusBar,
//     AngularFirestore,
//     SplashScreen,
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}
