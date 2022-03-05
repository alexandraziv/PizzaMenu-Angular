//Model podataka pice (klasa Pizza) na osnovu podataka koje vraća server za pojedinačnu picu.
//Pogledati u JSON-u koja polja sadrzi u nizu results.
//SERVER VRACA OBJEKAT, JEDNU PICU.
export class Pizza{
	_id :number;
	name :string;
	description :string;
	grade :number;
	price :number;

	//konstruktori primaju JS objekat.
	constructor(obj? :any){
		this._id = obj && obj._id || null;
		this.name = obj && obj.name || null;
		this.description = obj && obj.description || null;
		this.grade = obj && obj.grade || null;
		this.price = obj && obj.price || null;
	}
}