import { Component } from '@angular/core';
import { AmigosService } from '../../services/amigos.service';
import { LoginService } from '../../services/login.service';
import { BuscarAmigosPage } from '../buscar-amigos/buscar-amigos';
import { ActionSheetController, AlertController } from 'ionic-angular';
/**
 * Generated class for the ListaAmigos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-lista-amigos',
  templateUrl: 'lista-amigos.html',
})
export class ListaAmigosPage {
  amigos: any[] = [];
  amigosReciber:any[]= [];
  userId: string;
  friendId: string;
  textItem: string;
  buscarAmigoPage = BuscarAmigosPage;
  constructor(private _amigosService: AmigosService,
    private _loginService: LoginService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
    this.userId = _loginService.usuario.user.uid;
    this.buscarAmigos();
  }

  respuestaAmigo() {
    this._amigosService.respuestaAmigo("-KjrwfN2gK1SkehVs-Yp", "CMW6r4QDd9Ybfq14ub62CVq5U5C3", "Lr2FTf1YPgNNos3ZbrEqdCHbiPW2", false).subscribe(data => {
      console.log(data);

    });
  }
  buscarAmigos() {
    this._amigosService.burcarAmigos(this.userId, "amigo1")
      .subscribe(data => {
        for(let key$ in data){
          let a = data[key$];
          a.key$ = key$;
          this.amigos.push(data[key$ ]);

        }
        this._amigosService.burcarAmigos(this.userId, "amigo2")
          .subscribe(data => {
            //La data viene con un listado de objetos que hay que separar y hacer un listado de amigos
        for(let key$ in data){
          let a = data[key$];
          a.key$ = key$;
          this.amigos.push(data[key$ ]);

        }
        console.log(this.amigos);
            for(let k of this.amigos){
                console.log(k["amigo2"]);
this._amigosService.burcarAmigoPorId(k["amigo2"]).subscribe(
  data=>{

    this.amigosReciber = data;

    console.log(  this.amigosReciber);
  }
);

            }

      });
        // for (let datos in data) {
        //   this._amigosService.burcarAmigoPorId(datos).subscribe(data => {
        //     this.amigos.push(data);
        //   })
      //  }
        //  this.amigos = data;
      })
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
            //  this.nuevoAmigo()
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

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Petición enviada',
      buttons: ['OK']
    });
    alert.present();
  }
}
