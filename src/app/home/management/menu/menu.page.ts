import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public router: Router, 
    private navCtrl: NavController,
    private authService: AuthenticateService
    ) { }

  ngOnInit() {
  }
  reg(){
    this.router.navigate(['/home/tabs/management/menu/register'])
  }

  job(){
    this.router.navigate(['/home/tabs/management/menu/job'])
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.router.navigate(['/home/tabs/management'])
    })
    .catch(error => {
      console.log(error);
    })
  }
}