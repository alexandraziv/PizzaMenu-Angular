import { Pizza } from '../model/pizza.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent implements OnInit {

  //Sada ćemo prikazati rezultate na templejtu komponente PizzaListComponent. (roditelj)
  //Roditelj nam ovde salje svaki objekat pice gde smo prosli kroz niz,dakle u njegovom templejtu imamo pristup atributima!!!
	@Input() pizza: Pizza = new Pizza();
	/*slanje roditelju. (da bi podžao prosleđivanje id-a) kojim ćemo PizzaListComponent-u 
	propagirati događaj brisanja pice*/
	@Output() pizzaDeleted: EventEmitter<number> = new EventEmitter();
	@Output() sortCriteriaChanged: EventEmitter<any> = new EventEmitter();
	
	constructor() {}

	ngOnInit() {}

	onSubmit(){}

	onDelete(id: number) {
		this.pizzaDeleted.emit(id);
	}

	onSortCriteriaChanged(criteria?: any): void {
		this.sortCriteriaChanged.emit(criteria);
	  }

}
