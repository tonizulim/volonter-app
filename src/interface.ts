export interface volonteri {
    id: string;
    vrste_aktivnosti: string;
    ime: string;
    prezime: string;
    grad: string;
    
}

export interface Vrste_aktivonsti {
    id: string;
    vrste_aktivnosti: string;
}

export interface Gradovi {
    id: string;
    grad: string;
}

export interface Udruge{
    id: string;
    naziv: string;
    grad: string;
    adresa: string;
}

export interface Dogadaji{
    id: string;
    naziv: string;
    datum: string;
    lokacija: string;
    udruga_naziv: string;
    vrste_aktivnosti: string;
    opis: string;
}