import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
    exports: [
        ButtonModule, //
        CardModule,
        DividerModule,
        InputTextModule,
        InputNumberModule,
        InputMaskModule,
        MessagesModule,
        MessageModule,
        PasswordModule,
        ToastModule,
    ],
    providers: [
        ConfirmationService, //
        MessageService,
    ],
})
export class PrimeNgModule {}
// usado apenas para agrupar as importacoes do primeng
// os modulos devem ser exportados para serem usado
