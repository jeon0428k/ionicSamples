import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';

declare var google;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild("map") mapElement: ElementRef;
    private options: GeolocationOptions;
    private currentPos: Geoposition;

    private userLat;
    private userLong;
    private map: any;

    constructor(
        public navCtrl: NavController,
        public geoLocation: Geolocation
    ) {
    }

    ionViewDidEnter(){
        this.getUserLocation();
    }

    getUserLocation(): any {
        this.options = {
            enableHighAccuracy: false
        }

        this.geoLocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
            this.currentPos = pos;
            console.log('currentPost :', this.currentPos);

            this.userLat = pos.coords.latitude;
            this.userLong = pos.coords.longitude;

            this.addMap(this.userLat, this.userLong);
        },
        (err: PositionError) => {
            console.log(`error : ${err.message}`);
        });
    }

    addMap(userLat: any, userLong: any): any {
        let latLng = new google.maps.LatLng(userLat, userLong);
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker();
    }
    addMarker(): any {
        let userMarker = 'assets/imgs/custom_icon.png';
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter(),
            icon: userMarker
        });
        google.maps.event.addListener(marker, 'click', () => {
            
        });
    }

}
