import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { LoginDto } from '../interfaces/login.dto';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient //
    ) {}

    /**
     * Realizar o login
     * @param loginDto empresa, e-mail e senha
     * */
    public authentication(loginDto: LoginDto): Observable<HttpResponse<string>> {
        let url = `${environment.urlBackend}/auth/login`;
        return this.http.post(url, loginDto, {
            observe: 'response', // retorna uma resposta com acesso ao reader
            responseType: 'text', // reporta como texto, evitando que faca json.parse
        });
    }
}
