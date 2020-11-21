import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {path:'details/:ticker', component: SearchDetailsComponent},
  {path:'watchlist', component:WatchlistComponent},
  {path:'portfolio', component:PortfolioComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
