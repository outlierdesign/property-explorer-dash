import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FavoriteAction } from '@/hooks/useFavorites';

export const generatePDF = (favorites: FavoriteAction[], totalEstimate: number) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('My ACRES Action Plan', pageWidth / 2, 20, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const currentDate = new Date().toLocaleDateString('en-IE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(`Generated: ${currentDate}`, pageWidth / 2, 28, { align: 'center' });
  
  // Summary
  doc.setFontSize(12);
  doc.text(`Actions Selected: ${favorites.length}`, 14, 40);
  doc.text(`Total Estimated Payment: €${totalEstimate.toFixed(2)}`, 14, 48);
  
  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 52, pageWidth - 14, 52);
  
  let yPosition = 60;
  
  // Actions
  favorites.forEach((favorite, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Action number and title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${favorite.action.title}`, 14, yPosition);
    yPosition += 8;
    
    // Category badge
    if (favorite.action.category) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Category: ${favorite.action.category}`, 14, yPosition);
      yPosition += 6;
      doc.setTextColor(0, 0, 0);
    }
    
    // Description
    if (favorite.action.description) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(favorite.action.description, pageWidth - 28);
      doc.text(lines, 14, yPosition);
      yPosition += lines.length * 5 + 4;
    }
    
    // Payment details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    if (favorite.action.payment_rate && favorite.action.payment_unit) {
      doc.text(
        `Payment Rate: €${favorite.action.payment_rate.toFixed(2)} per ${favorite.action.payment_unit}`,
        14,
        yPosition
      );
      yPosition += 6;
    }
    
    // Custom quantities for fencing
    if (favorite.customQuantities?.meters) {
      doc.setFont('helvetica', 'normal');
      doc.text(`Length: ${favorite.customQuantities.meters} meters`, 14, yPosition);
      yPosition += 6;
    }
    
    // Calculated total
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Estimated Payment: €${favorite.calculatedTotal.toFixed(2)}`, 14, yPosition);
    yPosition += 10;
    
    // Separator line
    doc.setDrawColor(220, 220, 220);
    doc.line(14, yPosition, pageWidth - 14, yPosition);
    yPosition += 10;
  });
  
  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  doc.setPage(pageCount);
  
  yPosition = doc.internal.pageSize.getHeight() - 40;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', 14, yPosition);
  yPosition += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Actions: ${favorites.length}`, 14, yPosition);
  yPosition += 5;
  doc.text(`Total Estimated Payment: €${totalEstimate.toFixed(2)}`, 14, yPosition);
  yPosition += 10;
  
  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  const disclaimerLines = doc.splitTextToSize(
    'Note: Payments are subject to inspection and verification. This is an estimate only. ' +
    'Commitment period is typically 5 years. For official details, visit the ACRES website.',
    pageWidth - 28
  );
  doc.text(disclaimerLines, 14, yPosition);
  
  // Save the PDF
  const filename = `acres-action-plan-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};
