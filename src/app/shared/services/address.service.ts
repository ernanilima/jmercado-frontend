import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CountryDto } from '../interfaces/country.dto';
import { StateDto } from '../interfaces/state.dto';
import { RegionDto } from '../interfaces/region.dto';

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
     * Buscar todas as regioes do pais
     * @param codeCountry string
     * @returns Observable<RegionDto[]>
     */
    public getRegions(codeCountry: string): Observable<RegionDto[]> {
        return this.http.get<RegionDto[]>(
            `${environment.urlBackend}/endereco/regiao/${codeCountry}`
        );
    }

    /**
     * Buscar todos os estados com base na chave e valor da chave
     * @param key string - pais | regiao
     * @param value string
     * @returns Observable<StateDto[]>
     */
    public getStates(key: string, value: string): Observable<StateDto[]> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append(key, value);
        return this.http.get<StateDto[]>(`${environment.urlBackend}/endereco/estado`, {
            params: httpParams,
        });
    }
}
