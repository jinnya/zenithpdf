
import React from 'react';
import { 
  Combine, Scan, Trash2, FileOutput, LayoutPanelLeft, Camera, 
  Zap, ShieldCheck, ScanLine, FileType, Image, FileText, 
  Presentation, Table, Code, RotateCw, ListOrdered, 
  Stamp, Crop, Lock, Unlock, PenTool, Eraser, FileDiff, Hash, 
  Bookmark, Scaling, Settings2, ImageIcon, Contrast, Maximize, 
  PencilLine, Wrench, RefreshCw, Workflow, CheckSquare, 
  Type, Layers, Binary, Scissors, Languages,
  Microscope, AlignVerticalSpaceAround, MousePointerSquareDashed,
  PlusCircle, FileJson, FileSignature, EyeOff, ClipboardList, Move, ListChecks,
  Sparkles, Boxes, ShieldAlert
} from 'lucide-react';
import { PDFTool, ToolCategory } from './types';

const iconSize = 22;

export const PDF_TOOLS: PDFTool[] = [
  // --- POPULAR & AI ---
  { id: 'translate-doc', name: 'AI Document Translator', description: 'Translate PDF and Word documents to 50+ languages instantly.', icon: <Languages size={iconSize} />, category: ToolCategory.ADVANCED, trending: true },
  { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one single document in seconds.', icon: <Combine size={iconSize} />, category: ToolCategory.ORGANIZE, trending: true },
  { id: 'compress', name: 'Compress PDF', description: 'Reduce PDF file size without losing quality for easy sharing.', icon: <Zap size={iconSize} />, category: ToolCategory.OPTIMIZE, trending: true },

  // --- CONVERT TO PDF ---
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Microsoft Word DOC and DOCX to PDF format.', icon: <FileText size={iconSize} />, category: ToolCategory.CONVERT_TO, trending: true },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Transform JPG, PNG, and TIFF images into high-quality PDFs.', icon: <Image size={iconSize} />, category: ToolCategory.CONVERT_TO },
  { id: 'powerpoint-to-pdf', name: 'PowerPoint to PDF', description: 'Convert PPT and PPTX slides to PDF presentations.', icon: <Presentation size={iconSize} />, category: ToolCategory.CONVERT_TO },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert XLS and XLSX spreadsheets to PDF tables.', icon: <Table size={iconSize} />, category: ToolCategory.CONVERT_TO },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert web pages or HTML code directly to PDF.', icon: <Code size={iconSize} />, category: ToolCategory.CONVERT_TO },
  { id: 'scan-to-pdf', name: 'Scan to PDF', description: 'Use your camera to scan documents directly to PDF files.', icon: <Camera size={iconSize} />, category: ToolCategory.CONVERT_TO },

  // --- CONVERT FROM PDF ---
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF files back to editable Microsoft Word documents.', icon: <FileType size={iconSize} />, category: ToolCategory.CONVERT_FROM, trending: true },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Extract all pages or images from your PDF as JPG files.', icon: <ImageIcon size={iconSize} />, category: ToolCategory.CONVERT_FROM },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to editable Excel spreadsheets.', icon: <Table size={iconSize} />, category: ToolCategory.CONVERT_FROM },
  { id: 'pdf-to-powerpoint', name: 'PDF to PowerPoint', description: 'Turn PDF content into editable PowerPoint slides.', icon: <Presentation size={iconSize} />, category: ToolCategory.CONVERT_FROM },
  { id: 'pdf-to-pdfa', name: 'PDF to PDF/A', description: 'Convert PDF to PDF/A format for long-term archiving.', icon: <ShieldCheck size={iconSize} />, category: ToolCategory.CONVERT_FROM },
  { id: 'pdf-to-text', name: 'PDF to Text', description: 'Extract text content from your PDF files into TXT format.', icon: <Type size={iconSize} />, category: ToolCategory.CONVERT_FROM },

  // --- ORGANIZE ---
  { id: 'split', name: 'Split PDF', description: 'Split one PDF into multiple files by page range.', icon: <Scan size={iconSize} />, category: ToolCategory.ORGANIZE },
  { id: 'remove-pages', name: 'Remove Pages', description: 'Delete specific pages from your PDF document easily.', icon: <Trash2 size={iconSize} />, category: ToolCategory.ORGANIZE },
  { id: 'extract-pages', name: 'Extract Pages', description: 'Pick specific pages and save them as a new PDF.', icon: <FileOutput size={iconSize} />, category: ToolCategory.ORGANIZE },
  { id: 'organize', name: 'Organize PDF', description: 'Rearrange, add, or delete pages in your PDF workspace.', icon: <LayoutPanelLeft size={iconSize} />, category: ToolCategory.ORGANIZE },
  { id: 'rotate', name: 'Rotate PDF', description: 'Rotate PDF pages to portrait or landscape mode.', icon: <RotateCw size={iconSize} />, category: ToolCategory.EDIT_SIGN },
  { id: 'crop', name: 'Crop PDF', description: 'Trim PDF margins or select specific areas to keep.', icon: <Crop size={iconSize} />, category: ToolCategory.EDIT_SIGN },

  // --- EDIT & SIGN ---
  { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text, shapes, images, and freehand annotations.', icon: <PenTool size={iconSize} />, category: ToolCategory.EDIT_SIGN, trending: true },
  { id: 'sign-pdf', name: 'Sign PDF', description: 'Add your digital signature to any PDF document.', icon: <FileSignature size={iconSize} />, category: ToolCategory.EDIT_SIGN },
  { id: 'fill-sign', name: 'Fill & Sign', description: 'Fill out PDF forms and sign them electronically.', icon: <CheckSquare size={iconSize} />, category: ToolCategory.EDIT_SIGN },
  { id: 'watermark', name: 'Add Watermark', description: 'Protect documents with text or image watermarks.', icon: <Stamp size={iconSize} />, category: ToolCategory.EDIT_SIGN },
  { id: 'page-numbers', name: 'Page Numbers', description: 'Insert page numbers in any position or format.', icon: <ListOrdered size={iconSize} />, category: ToolCategory.EDIT_SIGN },
  { id: 'header-footer', name: 'Header & Footer', description: 'Add custom text to the top or bottom of every page.', icon: <AlignVerticalSpaceAround size={iconSize} />, category: ToolCategory.EDIT_SIGN },

  // --- OPTIMIZE & REPAIR ---
  { id: 'repair', name: 'Repair PDF', description: 'Recover data from damaged or corrupted PDF files.', icon: <Wrench size={iconSize} />, category: ToolCategory.OPTIMIZE },
  { id: 'ocr', name: 'OCR PDF', description: 'Convert scanned PDFs into searchable and selectable text.', icon: <ScanLine size={iconSize} />, category: ToolCategory.OPTIMIZE },
  { id: 'grayscale', name: 'Grayscale PDF', description: 'Convert colored PDFs to black and white to save ink.', icon: <Contrast size={iconSize} />, category: ToolCategory.OPTIMIZE },
  { id: 'flatten', name: 'Flatten PDF', description: 'Merge layers and make form fields uneditable.', icon: <Maximize size={iconSize} />, category: ToolCategory.OPTIMIZE },

  // --- SECURITY ---
  { id: 'protect', name: 'Protect PDF', description: 'Encrypt your PDF with a strong password.', icon: <Lock size={iconSize} />, category: ToolCategory.SECURITY },
  { id: 'unlock', name: 'Unlock PDF', description: 'Remove password protection and permissions from PDF.', icon: <Unlock size={iconSize} />, category: ToolCategory.SECURITY },
  { id: 'redact', name: 'Redact PDF', description: 'Permanently remove sensitive information from PDFs.', icon: <EyeOff size={iconSize} />, category: ToolCategory.SECURITY },
  { id: 'pdf-security', name: 'Security Suite', description: 'Advanced tools to audit and secure your documents.', icon: <ShieldAlert size={iconSize} />, category: ToolCategory.SECURITY },

  // --- ADVANCED ---
  { id: 'compare', name: 'Compare PDF', description: 'Detect differences between two PDF versions side-by-side.', icon: <FileDiff size={iconSize} />, category: ToolCategory.ADVANCED },
  { id: 'metadata', name: 'Edit Metadata', description: 'Modify Author, Title, and Subject fields of your PDF.', icon: <Settings2 size={iconSize} />, category: ToolCategory.ADVANCED },
  { id: 'bates-numbering', name: 'Bates Numbering', description: 'Legal document indexing and page numbering.', icon: <Hash size={iconSize} />, category: ToolCategory.ADVANCED },
  { id: 'bookmarks', name: 'Create Bookmarks', description: 'Build a clickable table of contents for navigation.', icon: <Bookmark size={iconSize} />, category: ToolCategory.ADVANCED },
  { id: 'workflows', name: 'Workflows', description: 'Automate repetitive multi-step PDF tasks.', icon: <Workflow size={iconSize} />, category: ToolCategory.ADVANCED },
];
