import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchDetailsComponent } from './search-details/search-details.component';
import {MatTabsModule} from '@angular/material/tabs';

import { HighchartsChartModule } from 'highcharts-angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsCardComponent } from './news-card/news-card.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { WatchlistCardComponent } from './watchlist-card/watchlist-card.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { DangerAlertComponent } from './danger-alert/danger-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioCardComponent } from './portfolio-card/portfolio-card.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';
import { SellModalComponent } from './sell-modal/sell-modal.component';
import { BuyAlertComponent } from './buy-alert/buy-alert.component';
import { MarketCloseAlertComponent } from './market-close-alert/market-close-alert.component';
import { MarketOpenAlertComponent } from './market-open-alert/market-open-alert.component';
import { InvalidTickerAlertComponent } from './invalid-ticker-alert/invalid-ticker-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteComponent,
    SearchDetailsComponent,
    NewsCardComponent,
    WatchlistComponent,
    WatchlistCardComponent,
    SuccessAlertComponent,
    DangerAlertComponent,
    WarningAlertComponent,
    PortfolioComponent,
    PortfolioCardComponent,
    BuyModalComponent,
    SellModalComponent,
    BuyAlertComponent,
    MarketCloseAlertComponent,
    MarketOpenAlertComponent,
    InvalidTickerAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    NgbModule,


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
