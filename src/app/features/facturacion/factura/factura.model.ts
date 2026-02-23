export interface ProductoFactura {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Factura {
  numero: string;
  cliente: string;
  fecha: Date;
  productos: ProductoFactura[];
}