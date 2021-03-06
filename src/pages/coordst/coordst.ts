import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import { TruckPage } from '../truck/truck';
/**
 * Generated class for the CoordstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coordst',
  templateUrl: 'coordst.html',
})
export class CoordstPage {

  map: any;
  data: any;
  estado: any;
  isSaved=false;
  next='';
  slatitude:string="";
  slongitude:string="";
  constructor(public navCtrl: NavController,private loadingCtrl:LoadingController, private geolocation:Geolocation, public navParams: NavParams) {
  }
  ngOnInit():void{
    this.drawMap();
  }
  ionViewDidLoad() {
    this.locate();
    console.log('ionViewDidLoad CoodsPage');
  }
  locate(){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loading.dismiss();
      this.slatitude=resp.coords.latitude+"";     
      this.slongitude=resp.coords.longitude+"";
      this.isSaved=true; 
    }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  nextQ(){

    this.navCtrl.setRoot(TruckPage,{slatitude:this.slatitude,slongitude:this.slongitude});
  }

  back(){
    this.navCtrl.setRoot(HomePage)
  }
  drawMap(): void {
    this.map = Leaflet.map('map').setView([-0.1836298, -78.4821206], 13);
    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'AppTuto',
      maxZoom: 15
    }).addTo(this.map);

 
    var map = this.map;

     //web location
     map.locate({ setView: true});

     //when we have a location draw a marker and accuracy circle
     function onLocationFound(e) {
       var radius = e.accuracy / 2;
       Leaflet.marker(e.latlng).addTo(map);
     }
     map.on('locationfound', onLocationFound);

    //alert on location error
    function onLocationError(e) {
      alert(e.message);
    }

    this.map.on('locationerror', onLocationError);
  }
}
