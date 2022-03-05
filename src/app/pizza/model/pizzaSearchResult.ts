//request get (read) sa servera sve pice. JSON response ima 2 property, count i results.
//model podataka za objekat koji server vraća na http://localhost:3000/api/pizzas
import { Pizza } from "./pizza.model"; // ./ u istom folderu.

export class PizzaSearchResult{

    //JSON PODACI SA SERVERA . results i count.
	pizzas: Pizza[];
	count: number;

    constructor(obj?: any) {
        //U nas niz pizzas, pomocu map operatora konvertujemo JS niz iz JSON-a i vracamo objekat po objekat sa servera.                                                   */
		this.pizzas = obj && obj.results.map((elem: any) => { return new Pizza(elem); }) || [];
		this.count = obj && obj.count || null;
	}	
}