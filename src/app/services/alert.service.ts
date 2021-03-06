import { Injectable } from '@angular/core';
import  { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController ) 
  {

   }


   async presentAlert(header,subheader,message)
   {
     //creates the alert and displays it as a header
      const alert = await this.alertController.create({
        header: header,
        subHeader: subheader,
        message: message,
        buttons: ['OK']
      });
    
      await alert.present();
   }
}