import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule,  } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';


import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { PaisesPage } from '../pages/paises/paises';
import { EquipoPage } from '../pages/equipo/equipo';
import { HeroePage } from '../pages/heroe/heroe';
import { LoginPage } from '../pages/login/login';
//services
import {PaisesService} from '../services/paises.service';
import {HeroesService} from '../services/heroes.service';
import {LoginService} from '../services/login.service';
//AgularFire

import { AuthService } from '../providers/auth-service';
export const firebaseConfig = {
  apiKey: "AIzaSyDiRtjf5YU9Qee6_7_XZnZsEPFq3dnJYZs",
     authDomain: "heroesdelfutbol-dc20e.firebaseapp.com",
     databaseURL: "https://heroesdelfutbol-dc20e.firebaseio.com",
     projectId: "heroesdelfutbol-dc20e",
     storageBucket: "heroesdelfutbol-dc20e.appspot.com",
     messagingSenderId: "670769318517"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PaisesPage,
    EquipoPage,
    HeroePage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
AngularFireDatabaseModule,
AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PaisesPage,
    EquipoPage,
    HeroePage,
    LoginPage,
    TabsPage
  ],
  providers: [
  
    LoginService,
    PaisesService,
    HeroesService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
