import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { LoadingComponent } from './misc/loading/loading.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng/prime-ng.module';

@NgModule({
    declarations: [
        BaseComponent,
        LoadingComponent,
    ],
    exports: [
        BaseComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        PrimeNgModule,
    ],
})
export class SharedModule { }
