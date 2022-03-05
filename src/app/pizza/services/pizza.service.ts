import { Pizza } from '../model/pizza.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaSearchResult } from '../model/pizzaSearchResult';

const baseUrl = "http://localhost:3000/api/pizzas";

@Injectable({
  providedIn: 'root'
})
  
//ng g service pizza/services/pizza
//PizzaService sluzi za komunikaciju sa serverom
//Za komunikaciju sa serverom potreban nam je HttpClientModule koji licno importujemo
//i HttpParams za parametre
  
export class PizzaService {

//importovali smo HttpClient i injektovali ga u konstruktor/ servis za dalje koriscenje this.http
constructor(private http: HttpClient) { }

  
/* U objektu params smo napravili sve parametre koje server može da primi (znamo koji su na osnovu datog API-ja servera).*/
//getAll metoda se obraca serveru u cilju dobavljanja svih objekata sa servera. 
//Podatke sa servera smo konvertovali u modelu podataka koji sadrzi count i results iz JSON-a.	
	getAll(params?: any): Observable<PizzaSearchResult> {
	 //na osnovu parametara koji smo dobili od komponente, pravimo js objekat  
    let queryParams: any = {};
		if (params) {
			queryParams = {params: new HttpParams()
				.set("pageSize", params.pageSize && params.pageSize.toString() || "")
				.set("page", params.page && params.page.toString() || "")
				.set("filter", params.filter && JSON.stringify(params.filter) || "")
				.set("sort", params.sort && params.sort.toString() || "")
				.set("sortDirection", params.sortDirection && params.sortDirection.toString() || "")
			}
		}
    return this.http.get(baseUrl, queryParams).pipe(map(
      data => { return new PizzaSearchResult(data) }
    ));
  }
	
	
//picu možemo dobaviti slanjem GET zahteva na http://localhost:3000/api/pizzas/:id.
get(id: number): Observable<Pizza> {
	return this.http.get(baseUrl + "/" + id).pipe(map(
		(jsonResponse: any) => { return new Pizza(jsonResponse); }
	));
}

add(newPizza: Pizza): Observable<Pizza> {
	return this.http.post(baseUrl, newPizza)
	.pipe(map((jsonResponse: any) => new Pizza(jsonResponse)));
}

update(pizza: Pizza): Observable<any> {
	return this.http.put(baseUrl + "/" + pizza._id, pizza)
	.pipe(map((jsonResponse:any) => new Pizza(jsonResponse)));
}

// server brise picu i vraca response
// delete , vraca novi niz vina 
remove(id: number): Observable<any> {
	return this.http.delete(baseUrl + "/" + id)
	.pipe(map((jsonResponse:any) => new Pizza(jsonResponse)));
}

}
