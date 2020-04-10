import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth'
//import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app';
import { Router } from '@angular/router'
//import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(
    //private auth: AngularFireAuth,
    public afAuth: AngularFireAuth,
    //public af: AngularFireAuth,
    public router: Router
    ) { }

  ngOnInit() {}

  
  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)
      this.router.navigate(['/home/tabs/management/menu'])
    }catch(err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("User not found")
      }
    }

  }
}