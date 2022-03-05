import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//radi komunikacije sa serverom unutar servisa
import { HttpClientModule } from '@angular/common/http';
//rad sa FormGroup, FormBuilder i uopste sa formama.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//ng add @ng-bootstrap/ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { PizzaDetailsComponent } from './pizza/pizza-details/pizza-details.component';
import { EditPizzaComponent } from './pizza/edit-pizza/edit-pizza.component';
import { HeaderComponent } from './core/header/header.component';
import { PaginationComponent } from './pizza/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PizzaListComponent,
    PizzaDetailsComponent,
    EditPizzaComponent,
    HeaderComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
