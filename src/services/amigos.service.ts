import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http"
import { App } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MyApp } from '../app/app.component';
import  'rxjs/Rx';
@Injectable()
export class AmigosService {
  fireUrlUsers:string  = "https://heroesdelfutbol-dc20e.firebaseio.com/users";
  fireUrlFriends: string = "https://heroesdelfutbol-dc20e.firebaseio.com/friends.json";
  fireUrlFriendsAcepted: string = "https://heroesdelfutbol-dc20e.firebaseio.com/friends";


  constructor( private http: Http) {

  }

nuevoAmigo(miId:string, idAmigo:string){
let body ={amigo1: miId,amigo2: idAmigo, aceptada: false, respondida:false};
let headers = new Headers({
  'content-type':'application/json'
})
return this.http.post(this.fireUrlFriends, body, {headers})
.map(res=>{
  console.log(res.json());
  return res.json();
}
);
}

respuestaAmigo(idAmistad:string, miId:string, idAmigo:string, aceptada:boolean){
let body ={amigo1: miId,amigo2: idAmigo, aceptada: aceptada, respondida:true};
let headers = new Headers({
  'content-type':'application/json'
})
let url = `${this.fireUrlFriendsAcepted}/${idAmistad}.json`;
return this.http.put(url, body, {headers})
.map(res=>{
  console.log(res.json());
  return res.json();
});
}
burcarAmigo(id:string){
    let url = `${this.fireUrlUsers}/${id}.json`
    return this.http.get( url )
    .map( res => res.json());
}
burcarAmigos(){
    let url = `${this.fireUrlUsers}.json`
    return this.http.get( url )
    .map( res => res.json());
}
eliminarAmigo(key:String){
  let url = `${this.fireUrlFriendsAcepted}/${key}.json`
  return this.http.delete(url)
  .map(res=>{
    res.json()
  })
}
}
