import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ConnectionServerService {
    constructor(
        private http: HttpClient //
    ) {}

    /**
     * Verifica se tem conexao com o servidor
     * @returns Observable<any>
     * */
    public getConnectionServer(): Observable<any> {
        return this.http.get<string>(`${environment.urlBackend}`);
    }
}
