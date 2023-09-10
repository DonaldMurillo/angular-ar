import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	userGeolocation = signal<{lat: number; lng: number; } | undefined>(undefined);

	getUserLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position)
				this.userGeolocation.set({ lat: position.coords.latitude, lng: position.coords.longitude });
			});
		}
	}

	trackUserLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition((position) => {
				console.log(position);
				this.userGeolocation.set({ lat: position.coords.latitude, lng: position.coords.longitude });
			},
			console.log);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}
}
