from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle
import pandas as pd 

def export_csv_to_pdf(csv_path, pdf_path):
    # Read CSV into DataFrame
    df = pd.read_csv('sample_dib.csv')

    # Create a list of lists from DataFrame
    data = [df.columns.tolist()] + df.values.tolist()

    # Create a PDF with reportlab
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter

    # Create a table
    table = Table(data)
    
    # Add style to the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ])
    table.setStyle(style)

    # Define the table width and height
    table.wrapOn(c, width, height)
    table.drawOn(c, 30, height - 30 * len(data))  # Adjust the position as needed

    # Save the PDF
    c.save()

# Example usage
export_csv_to_pdf('input.csv', 'output.pdf')
