import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {HeroService} from './heroes/hero.service';
import {DashboardComponent} from './dashboard/dashboard.component'
import {HeroesComponent} from './heroes/heroes.component'
import {HeroDetailComponent} from './heroes/hero-detail/hero-detail.component'

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
        `,
    directives: [
        ROUTER_DIRECTIVES,
        ],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        HeroService,
        ],
})
@RouteConfig([
    {
        path: 'app/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true,
    },
    {
        path: 'app/heroes',
        name: 'Heroes',
        component: HeroesComponent,
    },
    {
        path: 'app/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent,
    },
])
export class AppComponent {
    title = 'Tour of Heroes';
}
