import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class FacturaComponent {

  factura: any;

  generarPDF() {

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Factura', 14, 20);

    // Datos del cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${this.factura.cliente}`, 14, 30);
    doc.text(`Fecha: ${new Date(this.factura.fecha).toLocaleDateString()}`, 14, 37);

    // Preparar datos tabla
    const filas = this.factura.items.map((item: any) => [
      item.producto,
      item.cantidad,
      `$${item.precio}`,
      `$${item.cantidad * item.precio}`
    ]);

    // Tabla
    autoTable(doc, {
      startY: 45,
      head: [['Producto', 'Cantidad', 'Precio', 'Total']],
      body: filas
    });

    // Total general
    const totalGeneral = this.factura.items.reduce(
      (sum: number, item: any) => sum + item.cantidad * item.precio,
      0
    );

    const finalY = (doc as any).lastAutoTable.finalY;

    doc.text(`Total General: $${totalGeneral}`, 14, finalY + 10);

    // Descargar
    doc.save('factura.pdf');
  }
}