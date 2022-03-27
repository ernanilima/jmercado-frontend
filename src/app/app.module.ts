import { PrimeNgModule } from './prime-ng/prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, //
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        PrimeNgModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
