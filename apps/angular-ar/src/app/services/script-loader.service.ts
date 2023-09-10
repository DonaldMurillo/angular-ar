import { DOCUMENT } from "@angular/common";
import { inject, Injectable, RendererFactory2 } from "@angular/core";
import { forkJoin, Observable, Observer } from "rxjs";

type ScriptLoader = { src: string, attrs: Record<string, string> };

@Injectable({
	providedIn: 'root'
})
export class ScriptLoaderService {

	private document = inject(DOCUMENT);
	private renderer = inject(RendererFactory2).createRenderer(null, null);
	private loadedScripts: ScriptLoader[] = [];

	load(scripts: ScriptLoader[]): Observable<string[]> {
		const loadEvents$: Observable<string>[] = [];

		for (const scriptObj of scripts) {
			if (this.loadedScripts.includes(scriptObj)) {
				loadEvents$.push(new Observable((observer: Observer<string>) => {
					observer.next('');
					observer.complete();
				}));
			} else {
				const script = this.renderer.createElement('script');
				script.type = 'text/javascript';
				script.src = scriptObj.src;
				for (const key in scriptObj.attrs) {
					this.renderer.setAttribute(script, key, scriptObj.attrs[key]);
				}

				const loadEvent$ = new Observable((observer: Observer<string>) => {
					script.onload = () => {
						this.loadedScripts.push(scriptObj);
						observer.next(scriptObj.src);
						observer.complete();
					};

					script.onerror = (error: string | Event) => {
						observer.error(error);
					};

					this.renderer.appendChild(this.document.defaultView?.document.head, script);
				});

				loadEvents$.push(loadEvent$);
			}
		}

		return forkJoin(loadEvents$);
	}

}
