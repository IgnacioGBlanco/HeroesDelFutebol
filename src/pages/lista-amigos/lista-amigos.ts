import { Component } from '@angular/core';
import { AmigosService } from '../../services/amigos.service';
import { LoginService } from '../../services/login.service';
import { BuscarAmigosPage } from '../buscar-amigos/buscar-amigos';
import { ChatPage } from '../chat/chat';
import { NavController, ActionSheetController, AlertController } from 'ionic-angular';
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
  public rootPage = ChatPage;
  amigos: any[] = [];
  amigosReciber: any[] = [];
  userId: string;
  friendId: string;
  textItem: string;
  isSendingFriend: boolean;
  buscarAmigoPage = BuscarAmigosPage;
  constructor(private _amigosService: AmigosService,
    public navCtrl: NavController,
    private _loginService: LoginService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
    this.userId = _loginService.usuario.user.uid;
    this.buscarAmigos();
  }


  buscarAmigos() {
    this._amigosService.burcarAmigos(this.userId, "amigo1")
      .subscribe(data => {
        console.log(data);
        //  Paso de parentesis de objetos a corchete de objetos relaciones
        for (let key$ in data) {
          let a = data[key$];
          a.key$ = key$;
          this.amigos.push(data[key$]);

        }
        console.log(this.amigos);

        this._amigosService.burcarAmigos(this.userId, "amigo2")
          .subscribe(data2 => {
            //La data viene con un listado de objetos que hay que separar y hacer un listado de amigos
            console.log(data2);

            console.log(this.amigos);
            for (let key$ in data2) {
              let a = data2[key$];
              a.key$ = key$;
              this.amigos.push(data2[key$]);

            }
            console.log(this.amigos);
            let i = 0;
            for (let ka of this.amigos) {
              this._amigosService.burcarAmigoPorId(ka["amigo2"]).subscribe(data => {
                this.amigos[i].profile_picture = data['profile_picture'];
                this.amigos[i].username = data['username'];
                i++;
              });
            }
          });

      });
  }

  opcionesAmigo(amigo: any, k: string) {
    this.friendId = k;
    console.log(amigo)
    this.presentActionSheet(amigo, k);
  }
  presentActionSheet(amigo: any, k: string) {

    this.elegirBotones(amigo, k);

  }
  elegirBotones(amigo: any, k: string) {
    if (amigo.aceptada == true) {
      let actionSheet = this.actionSheetCtrl.create({
        title: `Acciones con ${amigo.username} `,
        buttons: [
          {

            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
              this.eliminarAmigo(k);
            }
          }, {
            text: 'Chat',
            handler: () => {
              //  this.nuevoAmigo()
              this.navCtrl.push(this.rootPage);
            }
          },

          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    } else
      if (amigo.amigo2 == this.userId) {
        let actionSheet = this.actionSheetCtrl.create({
          title: `Acciones con ${amigo.username} `,
          buttons: [
            {

              text: 'Eliminar',
              role: 'destructive',
              handler: () => {
                console.log('Destructive clicked');
                this.eliminarAmigo(k);
              }
            }, {
              text: 'Responder',
              handler: () => {
                //  this.nuevoAmigo()
                this.showConfirm(amigo);
              }
            },

            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        let actionSheet = this.actionSheetCtrl.create({
          title: `Acciones con ${amigo.username} `,
          buttons: [
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: () => {
                console.log('Destructive clicked');
                this.eliminarAmigo(k);
              }
            },

            {
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
  showConfirm(amigo: any) {
    console.log(amigo);
    let confirm = this.alertCtrl.create({
      title: 'amigo.username',
      message: 'aceptas a amigo.username?',
      buttons: [
        {
          text: 'Denegar',
          handler: () => {
            this._amigosService.respuestaAmigo(amigo.key$, amigo.amigo1, amigo.amigo2, false).subscribe();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log(amigo.key$);
            this._amigosService.respuestaAmigo(amigo.key$, amigo.amigo1, amigo.amigo2, true).subscribe();
          }
        }
      ]
    });
    confirm.present();
  }

}
