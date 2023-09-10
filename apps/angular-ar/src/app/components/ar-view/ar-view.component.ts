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
		HlmButtonDirective
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	templateUrl: './ar-view.component.html',
	styleUrls: ['./ar-view.component.scss'],
})
export class ArViewComponent implements AfterViewInit {


	@ViewChild('arView') arViewRef?: ElementRef;
	@Output() closeExperience = new EventEmitter();
	
	private scriptService = inject(ScriptLoaderService);
	private locationService = inject(LocationService);

	constructor() {
		this.locationService.trackUserLocation();
	}
	ngAfterViewInit() {

		this.scriptService.load([
			{ src: 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js', attrs: {} },
		]).subscribe();

	}

	ngOnDestroy() {
		let video = document.getElementsByTagName('video').item(0);
		video?.remove();
	}
}