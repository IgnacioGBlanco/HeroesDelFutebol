import { Component } from '@angular/core';
import {AmigosService} from '../../services/amigos.service';
import { ActionSheetController } from 'ionic-angular';
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
amigos:any[] = [];
  constructor(private _amigosService:AmigosService,
      public actionSheetCtrl: ActionSheetController) {
  this.buscarAmigos();
  }
nuevoAmigo(){
  this._amigosService.nuevoAmigo("CMW6r4QDd9Ybfq14ub62CVq5U5C3", "Lr2FTf1YPgNNos3ZbrEqdCHbiPW2").subscribe(data=>{

  },
    error=>console.error(error)
  );
}
respuestaAmigo(){
  this._amigosService.respuestaAmigo("-KjrwfN2gK1SkehVs-Yp","CMW6r4QDd9Ybfq14ub62CVq5U5C3", "Lr2FTf1YPgNNos3ZbrEqdCHbiPW2", false ).subscribe(data=>{
    console.log(data);

  });
}
buscarAmigo(){
  this._amigosService.burcarAmigo("CMW6r4QDd9Ybfq14ub62CVq5U5C3").subscribe(data=>{
    console.log(data);
  });
}
buscarAmigos(){
  this._amigosService.burcarAmigos()
    .subscribe(data => {
      this.amigos = data;
    })
}
opcionesAmigo(amigo:any, k:string){
  console.log(amigo)
  this.presentActionSheet(amigo, k);
}
presentActionSheet(amigo:any, keyFriend:string) {
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
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
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
eliminarAmigo(keyFriend:string){
this._amigosService.eliminarAmigo(keyFriend).subscribe(data=>{
  console.log(data);
  if(data){
    console.error(data);
  }else{
    delete this.amigos[keyFriend];
  }
})
}
}
