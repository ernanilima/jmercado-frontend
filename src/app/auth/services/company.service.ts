import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CompanyDto } from 'src/app/auth/interfaces/company.dto';

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    constructor(
        private http: HttpClient //
    ) { }

    public registerCompany(
        companyDto: CompanyDto,
        captchaResponse: string
    ): Observable<HttpResponse<string>> {
        let url = `${environment.urlBackend}/empresa`;
        return this.http.post(url, companyDto, {
            params: { 'g-recaptcha-response': captchaResponse },
            observe: 'response', // retorna uma resposta com acesso ao reader
            responseType: 'text', // reporta como texto, evitando que faca json.parse
        });
    }
}
