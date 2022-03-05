import { PizzaService } from '../services/pizza.service';
import { Component, OnInit } from '@angular/core';
// da bi nam radio formBuilder i ForrmGrupp, u modulu moramo da importujemo
//FormsModule, ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pizza } from '../model/pizza.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-edit-pizza',
	templateUrl: './edit-pizza.component.html',
	styleUrls: ['./edit-pizza.component.css']
})
//treba da sadrzi formu za auziranje pice
export class EditPizzaComponent implements OnInit {

	//model podataka pice koja treba da se prikaže na formi
	pizza: Pizza = new Pizza();

	//Napravljeno je polje pizzaForm (model forme)
	pizzaForm: FormGroup;

	//1. Injektovan je FormBuilder (dodat je kao parametar konstruktora)
	constructor(private fb: FormBuilder,
		private pizzaService: PizzaService,
		private router: Router,
		private route: ActivatedRoute) {
		this.pizzaForm = this.fb.group({
			'name': ['', Validators.required],
			'description': ['', Validators.required],
			'grade': ['', [Validators.required, Validators.min(1), Validators.max(5)]],
			'price': ['', Validators.required]
			//['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]] za jmbg.
		});
	}

	//preuzimanje :id sa servera da mozemo da prilikom edita
	//da nam server vrati vrednost tog objekta za izmenu
	ngOnInit() {
		let id: number = Number(this.route.snapshot.params["id"]);
		if (id) {
			this.pizzaService.get(id).subscribe({
				next: (data: Pizza) => {
					this.pizza = data;
					this.pizzaForm.patchValue(this.pizza);
				}
			});
		}
	}


/*onSubmit metodi treba da podržimo i ažuriranje pice pored dodavanja. Ako se sećate 
prošlog termina, zaključili smo da možemo razlikovati da li se radi
 o dodavanju nove pice ili ažuriranju postojeće na osnovu toga da li je id 
 parametar definisan*/

	onSubmit(): void {
		
		this.pizza = new Pizza(this.pizzaForm.value);
		let id: number = Number(this.route.snapshot.params["id"]);
		if (id) {
			this.pizza._id = id;
			this.pizzaService.update(this.pizza).subscribe({
				next: (data: any) => {
					this.router.navigate(["/pizzas"]);
				}
			});
		} else {
			this.pizzaService.add(this.pizza).subscribe({
				next: (data: any) => {
					this.router.navigate(["/pizzas"]);
				}
			});
		}
	}

	//dugme za vracanje informacija iz prethodnog submita.
	onRevert() {
		this.pizzaForm.patchValue(this.pizza);
		// console.log(this.pizzaForm.controls.errors);
	}




	//prilikom submita forme, dodeli nizu pizza citavu vrednostoj objekta piza, sva polja koja sadrzi 
	//u modelu podataka. Na kraju sumbita radimo reset forme!
	/* onSubmit() {
		   let submittedPizza : any = this.pizzaForm.value;
		   this.pizza = new Pizza(submittedPizza);
		   console.log(this.pizza);
		   this.pizzaForm.reset();
	 }*/

}
