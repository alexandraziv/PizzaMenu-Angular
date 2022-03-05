import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPizzaComponent } from './pizza/edit-pizza/edit-pizza.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';

const routes: Routes = [
  {path: 'pizzas', component: PizzaListComponent},
  {path: 'pizzas/add', component: EditPizzaComponent},
  {path: 'pizzas/:id', component: EditPizzaComponent},
  {path: '', redirectTo: '/pizzas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
