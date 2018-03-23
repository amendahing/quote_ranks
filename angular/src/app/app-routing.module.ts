import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NewQuotesComponent } from './new-quotes/new-quotes.component';

const routes: Routes = [
    { path: '',component: AllAuthorsComponent },
    { path: 'add_author',component: NewComponent },
    { path: 'edit_author/:id',component: EditComponent },
    { path: 'author_quotes/new/:id',component: NewQuotesComponent },
    { path: 'author_quotes/:id',component: QuotesComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
