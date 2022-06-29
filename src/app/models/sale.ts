import { SaleDetail } from './saleDetail';

export interface Sale{
    id?: number;
    iduserClient: number;
    date?: Date;
    total?: number;
    saleDetails: SaleDetail[];
}