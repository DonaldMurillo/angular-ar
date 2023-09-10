import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Client, Account, ID } from "appwrite";

@Component({
	standalone: true,
	imports: [NxWelcomeComponent, RouterModule],
	selector: 'angular-ar-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	title = 'angular-ar';
	client = new Client();

	constructor() {
		this.client.setEndpoint('https://appwrite.donaldmurillo.com/v1')
			.setProject('64fbe2adb36a2c049ef4');

		const account = new Account(this.client);

		// Register User
		account.create(
			ID.unique(),
			'me@example.com',
			'password',
			'Jane Doe'
		).then(response => {
			console.log(response);
		}, error => {
			console.log(error);
		});

		// Subscribe to files channel
		this.client.subscribe('files', response => {
			if (response.events.includes('buckets.*.files.*.create')) {
				// Log when a new file is uploaded
				console.log(response.payload);
			}
		});
	}

}
