import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../services/login.service';
import { AmigosService } from '../../services/amigos.service';
import { ActionSheetController, AlertController } from 'ionic-angular';
/**
 * Generated class for the BuscarAmigos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-buscar-amigos',
  templateUrl: 'buscar-amigos.html',
})

export class BuscarAmigosPage {
  amigos: any[] = [];
  userId:string;
  friendId:string;
  textItem: string;
  constructor(private _amigosService: AmigosService,
      public actionSheetCtrl: ActionSheetController,
    private _loginService: LoginService,private navCtrl: NavController) {
      this.userId=_loginService.usuario.user.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarAmigos');
  }
  buscarAmigo(nombre: string) {
    console.log("buscando " + nombre);
    if (nombre != undefined&& nombre != null && nombre.length > 0 ) {
      this._amigosService.burcarAmigo(nombre).subscribe(data => {
        console.log("Amigos2", data);


        this.amigos = data;

      });
    } else {
      this.amigos = [];
    }
  }
  nuevoAmigo() {
    this._amigosService.nuevoAmigo(this.userId, this.friendId).subscribe(data => {
this.navCtrl.pop();
    },
      error => console.error(error)
    );
  }
  opcionesAmigo(amigo: any, k: string) {
    this.friendId = k;
    console.log(amigo)
    this.presentActionSheet(amigo, k);
  }
  presentActionSheet(amigo: any, keyFriend: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: `Acciones con ${amigo.username} `,
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.eliminarAmigo(keyFriend);
          }
        }, {
          text: 'Solicitar',
          handler: () => {
          this.nuevoAmigo()
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  eliminarAmigo(keyFriend: string) {
    this._amigosService.eliminarAmigo(keyFriend).subscribe(data => {
      console.log(data);
      if (data) {
        console.error(data);
      } else {
        delete this.amigos[keyFriend];
      }
    })
  }
}
