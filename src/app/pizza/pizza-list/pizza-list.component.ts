import { PizzaSearchResult } from './../model/pizzaSearchResult';
import { Component, OnInit } from '@angular/core';
import { Pizza } from '../model/pizza.model';
import { PizzaService } from '../services/pizza.service';
import { max, of } from 'rxjs';

const PAGE_SIZE: number = 5;

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  
  //Ova komponenta treba da nam prikaze podatke sa servera, jer u servisu
  //samo cuvamo vrednosti koje smo konvertovali u modelu,
  //a ovde ih prikazujemo da ne budzimo kod bzvz
  pizzaList: Pizza[] = [];
  pizzaCount: number = -1;

  //objekat koji saljemo serveru preko servisa, zato uvozimo servis u komponentu.
  params: any = {
    sort: "name",
    sortDirection: "asc",
    page: 1,
    pageSize: PAGE_SIZE,
    filter: {
      
    }
  }
  pageCount: number = -1;
  
  constructor(private pizzaService: PizzaService) { }

//primetila si da this.params izbacuje gresku trenutno?
// To je zato sto parametre koje treba da pošalje serveru i pošalje ih sa zahtevom. 
// MORAMO U SERVISU IMPORTOVATI I HTTP PARAMS DA IH PRIHVATI KAO PARAMETRE THIS.PARAMS
  //zelimo da se ova komponenta subskrajbuje kad se desi promena u Observable osluskivacu
  //i da nam vrati osvezi podatke o nizu i broju pica 
  ngOnInit() {
    this.pizzaService.getAll(this.params).subscribe({
    next: (response: PizzaSearchResult) => {
      this.pizzaList = response.pizzas;
      this.pizzaCount = response.count;
      this.pageCount = Math.ceil(this.pizzaCount/PAGE_SIZE);
      console.log("Retreived pizzas: ", this.pizzaCount);
    },
    error: error => {
      console.log("Error retreiving pizzas from server. Reason: ", error.statusText);
      }
  });
  }

changePage(newPage: number): void {
    this.params.page = newPage;
    this.ngOnInit();
  }

/*Implementirati poziv remove metode servisa. U next listener-u (nakon uspešnog brisanja pice)
ćemo od servera zatražiti ažurnu listu pica jer se učitana lista neće automatski osvežiti jer se 
brisanje ne odvija nad njom*/
onPizzaDeleted(id: number): void {
  this.pizzaService.remove(id).subscribe({
    next: (data: PizzaSearchResult) => {
       //ponovo ucitava listu , bez jedne obrisane pice
      this.ngOnInit();
    }
  });
}
  
onSortCriteriaChanged(): void {

  let price = this.pizzaList.sort((a, b) => a.price - b.price);
 // this.pizzaList.pipe(max(a, b) => a.price - b.price ? "desc" : "asc")
    if (this.params.sort == 'name' || this.params.sort == 'grade') {
      this.params.sortDirection == this.params ? "desc" : "asc";
    }
    if (this.params.sort == 'price') {
      this.params.sortDirection === price ? "desc" : "asc";
    }
    
  this.ngOnInit();
}


}
