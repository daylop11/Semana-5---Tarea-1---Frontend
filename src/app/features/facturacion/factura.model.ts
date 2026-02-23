export interface FacturaItem {
  producto: string;
  cantidad: number;
  precio: number;
}

export interface Factura {
  cliente: string;
  fecha: Date;
  items: FacturaItem[];
}