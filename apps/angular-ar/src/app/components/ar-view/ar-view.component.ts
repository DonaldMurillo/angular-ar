import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// import * as AR from '@ar-js-org/ar.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const AR = require('@ar-js-org/ar.js');

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'ar-view',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ar-view.component.html',
	styleUrls: ['./ar-view.component.scss'],
})
export class ArViewComponent implements AfterViewInit {

	@ViewChild('arView') arViewRef?: ElementRef;

	ngAfterViewInit() {


		if (this.arViewRef) {

		}
	}

}