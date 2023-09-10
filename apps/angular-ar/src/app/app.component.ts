import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Client,  } from "appwrite";
import { LocationService } from './services/location.service';
import { CommonModule } from '@angular/common';
import { ArViewComponent } from './components/ar-view/ar-view.component';
import { HlmButtonDirective } from '@spartan-ng/button-helm';
import { HlmH1Directive, HlmH2Directive, HlmUlDirective } from '@spartan-ng/typography-helm';


@Component({
	standalone: true,
	imports: [
		NxWelcomeComponent,
		RouterModule,
		CommonModule,
		ArViewComponent,
		HlmButtonDirective,
		HlmH1Directive,
		HlmUlDirective,
		HlmH2Directive
	],
	selector: 'angular-ar-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	title = 'angular-ar';
	client = new Client();
	locationService = inject(LocationService);
	start = false;

	constructor() {
		// this.client.setEndpoint('https://appwrite.donaldmurillo.com/v1')
		// 	.setProject('64fbe2adb36a2c049ef4');

		// const account = new Account(this.client);
		// const db = new Databases(this.client);
		// this.locationService.trackUserLocation()
		// // Register User
		// account.create(
		// 	ID.unique(),
		// 	'mee@example.com',
		// 	'password',
		// 	'John Doe'
		// ).then(response => {
		// 	console.log(response);
		// }, error => {
		// 	console.log(error);
		// });

		// // Subscribe to files channel
		// this.client.subscribe('files', response => {
		// 	if (response.events.includes('buckets.*.files.*.create')) {
		// 		// Log when a new file is uploaded
		// 		console.log(response.payload);
		// 	}
		// });
	}

}
