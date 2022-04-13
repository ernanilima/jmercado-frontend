import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryDto } from '../interfaces/country.dto';
import { StateDto } from '../interfaces/state.dto';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    constructor(
        private http: HttpClient //
    ) {}

    /**
     * Buscar todos os paises
     * @returns Observable<CountryDto[]>
     */
    public getCountries(): Observable<CountryDto[]> {
        return this.http.get<CountryDto[]>(`${environment.urlBackend}/endereco/pais`);
    }

    /**
     * Buscar todos os estados com base no codigo(ibge) do pais
     * @param codeCountry string
     * @returns Observable<StateDto[]>
     */
    public getStates(codeCountry: string): Observable<StateDto[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('pais', codeCountry);
        return this.http.get<StateDto[]>(`${environment.urlBackend}/endereco/estado`, {
            params: httpParams,
        });
    }
}