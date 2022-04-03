export interface CompanyDto {
    companyName: string;
    tradingName: string;
    ein: string;
    email: string;
    telephone: {
        telephone: string;
        cellPhone: string;
        whatsappCellPhone: boolean;
    };
    address: {
        zipCode: string;
        country: string;
        state: string;
        city: string;
        district: string;
        street: string;
        number: string;
        complement: string;
    };
    user: {
        name: string;
        email: string;
        password: string;
    };
}
