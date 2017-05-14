import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ChatService {
  chats: FirebaseListObservable<any>;
  usuario:any ={
    nombre:"Juan Carlos"
  }
  mensaje: string = "";
  constructor(private db: AngularFireDatabase) {

  }
  cargarMensajes(){
  this.chats = this.db.list('/chats',{
    query:{
      limitToLast:20,
      orderByKey:true
    }
  })
  return this.chats;

  }
  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: "juancarlos",
      mensaje: texto
    }
    return this.chats.push(mensaje);
  }
}
export interface Mensaje {
  nombre: string;
  mensaje: string;
  uid?: string;
}
