import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Factura } from './factura.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.html',
  styleUrls: ['./factura.less']
})
export class FacturaComponent {

  factura: Factura = {
    numero: '001',
    cliente: 'Juan Pérez',
    fecha: new Date(),
    productos: [
      { nombre: 'Película 1', cantidad: 1, precio: 10 },
      { nombre: 'Película 2', cantidad: 2, precio: 15 }
    ]
  };

  generarReporte() {

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('FACTURA', 14, 20);

    // Datos principales
    doc.setFontSize(12);
    doc.text(`Cliente: ${this.factura.cliente}`, 14, 30);
    doc.text(`Fecha: ${this.factura.fecha.toLocaleDateString()}`, 14, 37);
    doc.text(`Factura N°: ${this.factura.numero}`, 14, 44);

    const rows = this.factura.productos.map(p => [
      p.nombre,
      p.cantidad.toString(),
      `$${p.precio}`,
      `$${p.cantidad * p.precio}`
    ]);

    autoTable(doc, {
      startY: 55,
      head: [['Producto', 'Cantidad', 'Precio', 'Total']],
      body: rows
    });

    const total = this.factura.productos
      .reduce((sum, p) => sum + (p.cantidad * p.precio), 0);

    const finalY = (doc as any).lastAutoTable.finalY;
      doc.text(`TOTAL: $${total}`, 14, finalY + 10);
      doc.save(`factura-${this.factura.numero}.pdf`);
  }
}