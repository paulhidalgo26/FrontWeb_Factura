import { DecimalPipe } from '@angular/common';
import { SaleDetail } from './saleDetail';

export interface Sale{
    id?: number;
    iduserClient: number;
    date?: Date;
    total?: DecimalPipe;
    saleDetails: SaleDetail[];
}