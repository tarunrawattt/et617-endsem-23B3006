# build_deliverables.py - Generates professionally formatted DOCX and PDF reports
import os
import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table as RLTable, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOT_DIR = os.path.join(BASE_DIR, 'screenshots')
REPORT_MD_PATH = os.path.join(BASE_DIR, 'REPORT.md')
DOCX_OUTPUT_PATH = os.path.join(BASE_DIR, 'REPORT.docx')
PDF_OUTPUT_PATH = os.path.join(BASE_DIR, 'REPORT.pdf')

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), fill_hex)
    tcPr.append(shd)

def generate_docx():
    print("Generating REPORT.docx...")
    doc = Document()
    
    # Page setup - 0.8 inch margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Styles
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(10.5)
    normal_style.font.color.rgb = RGBColor(30, 42, 36)

    # Document Header Title
    title_p = doc.add_paragraph()
    title_run = title_p.add_run("ET617 End-Semester Examination Report")
    title_run.font.size = Pt(22)
    title_run.font.bold = True
    title_run.font.color.rgb = RGBColor(31, 93, 58) # Pitch Green
    title_p.paragraph_format.space_after = Pt(4)

    sub_p = doc.add_paragraph()
    sub_run = sub_p.add_run("Candidate Roll No: 23B3006 | ET617 Educational Technology | Card: P6-T10-L2-C5\nApplication: CricTeam XI – School Cricket Selection Lab")
    sub_run.font.size = Pt(11)
    sub_run.font.bold = True
    sub_run.font.color.rgb = RGBColor(181, 56, 42) # Leather Red
    sub_p.paragraph_format.space_after = Pt(14)

    with open(REPORT_MD_PATH, 'r', encoding='utf-8') as f:
        md_text = f.read()

    lines = md_text.split('\n')
    i = 0
    in_table = False
    table_lines = []
    in_code = False
    code_lines = []

    while i < len(lines):
        line = lines[i]

        # Code block handler
        if line.startswith('```'):
            if in_code:
                in_code = False
                code_text = '\n'.join(code_lines)
                cp = doc.add_paragraph()
                cp.paragraph_format.space_before = Pt(4)
                cp.paragraph_format.space_after = Pt(6)
                c_run = cp.add_run(code_text)
                c_run.font.name = 'Consolas'
                c_run.font.size = Pt(8.5)
                c_run.font.color.rgb = RGBColor(60, 60, 60)
                code_lines = []
            else:
                in_code = True
                code_lines = []
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        # Markdown Table handler
        if line.strip().startswith('|') and line.strip().endswith('|'):
            table_lines.append(line)
            i += 1
            continue
        elif table_lines:
            # Process table
            render_docx_table(doc, table_lines)
            table_lines = []

        # Image embed handler
        img_match = re.match(r'!\[(.*?)\]\((.*?)\)', line.strip())
        if img_match:
            caption = img_match.group(1)
            img_rel_path = img_match.group(2)
            img_full_path = os.path.join(BASE_DIR, img_rel_path.replace('/', os.sep))
            if os.path.exists(img_full_path):
                ip = doc.add_paragraph()
                ip.alignment = WD_ALIGN_PARAGRAPH.CENTER
                ip.paragraph_format.space_before = Pt(8)
                ip.paragraph_format.space_after = Pt(4)
                doc.add_picture(img_full_path, width=Inches(5.8))
                
                # Caption
                cap_p = doc.add_paragraph()
                cap_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                cap_run = cap_p.add_run(f"Figure: {caption}")
                cap_run.font.size = Pt(9.5)
                cap_run.font.italic = True
                cap_run.font.color.rgb = RGBColor(100, 100, 100)
                cap_p.paragraph_format.space_after = Pt(12)
            i += 1
            continue

        # Headings
        if line.startswith('# '):
            # Skip top title as already rendered
            pass
        elif line.startswith('## '):
            heading_text = line[3:].strip()
            hp = doc.add_paragraph()
            hp.paragraph_format.space_before = Pt(16)
            hp.paragraph_format.space_after = Pt(6)
            hrun = hp.add_run(heading_text)
            hrun.font.size = Pt(15)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(31, 93, 58) # Pitch green
        elif line.startswith('### '):
            heading_text = line[4:].strip()
            hp = doc.add_paragraph()
            hp.paragraph_format.space_before = Pt(12)
            hp.paragraph_format.space_after = Pt(4)
            hrun = hp.add_run(heading_text)
            hrun.font.size = Pt(12.5)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(181, 56, 42) # Leather red
        elif line.startswith('#### '):
            heading_text = line[5:].strip()
            hp = doc.add_paragraph()
            hp.paragraph_format.space_before = Pt(10)
            hp.paragraph_format.space_after = Pt(3)
            hrun = hp.add_run(heading_text)
            hrun.font.size = Pt(11)
            hrun.font.bold = True
            hrun.font.color.rgb = RGBColor(40, 40, 40)
        elif line.startswith('> '):
            # Blockquote
            bp = doc.add_paragraph()
            bp.paragraph_format.left_indent = Inches(0.4)
            bp.paragraph_format.space_before = Pt(4)
            bp.paragraph_format.space_after = Pt(6)
            brun = bp.add_run(line[2:].strip())
            brun.font.italic = True
            brun.font.color.rgb = RGBColor(50, 50, 50)
        elif line.startswith('* ') or line.startswith('- '):
            # Bullet item
            bp = doc.add_paragraph(style='List Bullet')
            bp.paragraph_format.space_before = Pt(2)
            bp.paragraph_format.space_after = Pt(2)
            add_formatted_text(bp, line[2:].strip())
        elif line.strip() == '---':
            pass
        elif line.strip():
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(3)
            p.paragraph_format.space_after = Pt(4)
            add_formatted_text(p, line.strip())

        i += 1

    if table_lines:
        render_docx_table(doc, table_lines)

    doc.save(DOCX_OUTPUT_PATH)
    print(f"Saved: {DOCX_OUTPUT_PATH}")

def render_docx_table(doc, table_lines):
    rows_data = []
    for tline in table_lines:
        if '---' in tline:
            continue
        cells = [c.strip() for c in tline.strip().strip('|').split('|')]
        rows_data.append(cells)

    if not rows_data:
        return

    num_rows = len(rows_data)
    num_cols = max(len(r) for r in rows_data)

    table = doc.add_table(rows=num_rows, cols=num_cols)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    for row_idx, row in enumerate(rows_data):
        for col_idx, cell_value in enumerate(row):
            if col_idx < num_cols:
                cell = table.cell(row_idx, col_idx)
                cell.paragraphs[0].paragraph_format.space_before = Pt(2)
                cell.paragraphs[0].paragraph_format.space_after = Pt(2)
                
                if row_idx == 0:
                    set_cell_background(cell, '1F5D3A') # Pitch green header
                    run = cell.paragraphs[0].add_run(cell_value)
                    run.font.bold = True
                    run.font.size = Pt(9.5)
                    run.font.color.rgb = RGBColor(255, 255, 255)
                else:
                    if row_idx % 2 == 1:
                        set_cell_background(cell, 'F9F7F2') # Cream subtle tint
                    run = cell.paragraphs[0].add_run(cell_value)
                    run.font.size = Pt(9)
                    run.font.color.rgb = RGBColor(30, 42, 36)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

def add_formatted_text(paragraph, text):
    # Parses bold **text** and italic *text*
    parts = re.split(r'(\*\*.*?\*\*|\*.*?\*)', text)
    for part in parts:
        if part.startswith('**') and part.endswith('**'):
            run = paragraph.add_run(part[2:-2])
            run.font.bold = True
        elif part.startswith('*') and part.endswith('*'):
            run = paragraph.add_run(part[1:-1])
            run.font.italic = True
        else:
            paragraph.add_run(part)

def generate_pdf():
    print("Generating REPORT.pdf...")
    pdf = SimpleDocTemplate(
        PDF_OUTPUT_PATH,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#1F5D3A'),
        spaceAfter=6
    )

    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#B5382A'),
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'DocH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1F5D3A'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'DocH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=colors.HexColor('#B5382A'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#1E2A24'),
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        leftIndent=15,
        textColor=colors.HexColor('#1E2A24'),
        spaceAfter=3
    )

    caption_style = ParagraphStyle(
        'DocCaption',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        alignment=1, # Center
        textColor=colors.HexColor('#555555'),
        spaceAfter=8
    )

    code_style = ParagraphStyle(
        'DocCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#2E3B33'),
        spaceBefore=4,
        spaceAfter=6
    )

    story = []
    story.append(Paragraph("ET617 End-Semester Examination Report", title_style))
    story.append(Paragraph("Candidate Roll No: 23B3006 | ET617 Educational Technology | Card: P6-T10-L2-C5<br/>Application: CricTeam XI – School Cricket Selection Lab", sub_style))

    with open(REPORT_MD_PATH, 'r', encoding='utf-8') as f:
        md_text = f.read()

    lines = md_text.split('\n')
    i = 0
    in_table = False
    table_lines = []
    in_code = False
    code_lines = []

    while i < len(lines):
        line = lines[i]

        if line.startswith('```'):
            if in_code:
                in_code = False
                code_text = '<br/>'.join([l.replace(' ', '&nbsp;') for l in code_lines])
                story.append(Paragraph(code_text, code_style))
                code_lines = []
            else:
                in_code = True
                code_lines = []
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        if line.strip().startswith('|') and line.strip().endswith('|'):
            table_lines.append(line)
            i += 1
            continue
        elif table_lines:
            t = render_pdf_table(table_lines, body_style)
            if t:
                story.append(t)
                story.append(Spacer(1, 6))
            table_lines = []

        # Image embed
        img_match = re.match(r'!\[(.*?)\]\((.*?)\)', line.strip())
        if img_match:
            caption = img_match.group(1)
            img_rel_path = img_match.group(2)
            img_full_path = os.path.join(BASE_DIR, img_rel_path.replace('/', os.sep))
            if os.path.exists(img_full_path):
                try:
                    # Scaled image
                    img = RLImage(img_full_path, width=6.2*inch, height=3.87*inch)
                    story.append(KeepTogether([img, Spacer(1, 3), Paragraph(f"Figure: {caption}", caption_style)]))
                except Exception as e:
                    print(f"Error adding image {img_full_path}: {e}")
            i += 1
            continue

        if line.startswith('# '):
            pass
        elif line.startswith('## '):
            clean_t = line[3:].strip()
            story.append(Paragraph(clean_t, h1_style))
        elif line.startswith('### '):
            clean_t = line[4:].strip()
            story.append(Paragraph(clean_t, h2_style))
        elif line.startswith('#### '):
            clean_t = line[5:].strip()
            story.append(Paragraph(f"<b>{clean_t}</b>", body_style))
        elif line.startswith('* ') or line.startswith('- '):
            txt = format_inline_html(line[2:].strip())
            story.append(Paragraph(f"&bull; {txt}", bullet_style))
        elif line.startswith('> '):
            txt = format_inline_html(line[2:].strip())
            story.append(Paragraph(f"<i>&ldquo;{txt}&rdquo;</i>", bullet_style))
        elif line.strip() == '---':
            story.append(Spacer(1, 6))
        elif line.strip():
            txt = format_inline_html(line.strip())
            story.append(Paragraph(txt, body_style))

        i += 1

    if table_lines:
        t = render_pdf_table(table_lines, body_style)
        if t:
            story.append(t)

    pdf.build(story)
    print(f"Saved: {PDF_OUTPUT_PATH}")

def format_inline_html(text):
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    # Bold **text**
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    # Italic *text*
    text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
    return text

def render_pdf_table(table_lines, body_style):
    data = []
    for tl in table_lines:
        if '---' in tl:
            continue
        cells = [c.strip() for c in tl.strip().strip('|').split('|')]
        row = []
        for c in cells:
            clean = format_inline_html(c)
            row.append(Paragraph(clean, body_style))
        data.append(row)

    if not data:
        return None

    # Calculate column widths to fit page (approx 7.2 inches total)
    num_cols = len(data[0])
    col_w = (7.2 * inch) / num_cols

    t = RLTable(data, colWidths=[col_w] * num_cols)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1F5D3A')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#FFFFFF'), colors.HexColor('#F8F5EE')]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#D5CAAF')),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    return t

if __name__ == '__main__':
    generate_docx()
    generate_pdf()
    print("Deliverables generation completed successfully!")
