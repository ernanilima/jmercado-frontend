import { ConnectionServerService } from 'src/app/shared/services/connection-server.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    public showStatus: boolean = true;
    public connectionOk: boolean = false;
    public textConnection: string = 'Conectando com o servidor';

    private interval: ReturnType<typeof setTimeout>;

    constructor(
        private connectionServerService: ConnectionServerService //
    ) {}

    ngOnInit(): void {
        // verifica se existe conexao com o servidor
        this.connectionServer();
        // realiza uma verificacao a cada 3 segundos ate que a conexao seja realizada
        this.interval = setInterval(() => {
            this.connectionServer();
        }, 3000);
    }

    private connectionServer(): void {
        this.connectionServerService.getConnectionServer().subscribe((result) => {
            // para a thread que repete a verificacao
            clearInterval(this.interval);

            this.connectionOk = true;
            this.textConnection = result.message;

            // para de exibir o status de comunicacao
            setTimeout(() => {
                this.showStatus = false;
            }, 2000);
        });
    }
}
