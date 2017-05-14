import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';
/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  mensaje:string = "";
  elemento:any;
   constructor(public _cs: ChatService) {
this._cs.cargarMensajes().subscribe(()=>{
  console.log("Mensajes cargados")
  setTimeout(()=>  this.elemento.scrollTop = this.elemento.scrollHeight, 50);

})

   }
   ionViewDidLoad(){
     this.elemento = document.getElementById("app-mensajes")
   }
enviar(){
  if(this.mensaje.length == 0){
    return;
  }
  this._cs.agregarMensaje(this.mensaje)
  .then( ()=>console.log("Hecho!") )
  .catch( (error)=> console.log(error))
  this.mensaje ="";
}

}
