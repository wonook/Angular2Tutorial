import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

import {Hero} from './hero';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {
    constructor (
        private http: Http
        ) {}

    private _heroesUrl = 'app/data/heroes.json';
    private _heroUrl = 'app/data/heroes/';

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this._heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        const url: string = this._heroUrl + id.toString() + ".json";
        return this.http.get(url)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}