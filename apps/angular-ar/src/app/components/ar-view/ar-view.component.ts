import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Output, ViewChild, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { HlmButtonDirective } from '@spartan-ng/button-helm';
import { LocationService } from '../../services/location.service';

require('aframe');
require('aframe-look-at-component');


@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'ar-view',
	standalone: true,
	imports: [
		CommonModule,
		HlmButtonDirective,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './ar-view.component.html',
	styleUrls: ['./ar-view.component.scss'],
})
export class ArViewComponent implements AfterViewInit {


	@ViewChild('arView') arViewRef?: ElementRef;
	@Output() closeExperience = new EventEmitter();
	
	private scriptService = inject(ScriptLoaderService);
	protected locationService = inject(LocationService);
	points: any[] = [
		{ lat: 26.316801859922766, lng: -80.18117468641245 },
		{ lat: 26.31668267289344, lng: -80.18114677949247 },
		{ lat: 26.316614986377754, lng: -80.1807708568645 },
		{ lat: 26.31715131303795, lng: -80.18038348107314 }
	]

	constructor() {
		this.locationService.trackUserLocation();
		this.locationService.userGeolocation()
	}


	ngAfterViewInit() {

		this.scriptService.load([
			{ src: 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js', attrs: {} },
		]).subscribe();

	}

	loaded(scene: any) {

		// const loc = this.locationService.userGeolocation();
		// if (loc) {

		// 	const { lat, lng } = loc;
		// 	for (let index = 0; index < 10; index++) {
		// 		this.points.push({ lat: lat, lng: lng + Number(`0.0${index}`) });
				
		// 	}

		// }
		console.log(scene)
	}

	ngOnDestroy() {
		const video = document.getElementsByTagName('video').item(0);
		video?.remove();
	}
}