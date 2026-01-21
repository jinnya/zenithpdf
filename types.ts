
import { ReactNode } from 'react';

export enum ToolCategory {
  CONVERT_TO = 'Convert to PDF',
  CONVERT_FROM = 'Convert from PDF',
  EDIT_SIGN = 'Edit & Sign',
  ORGANIZE = 'Organize PDF',
  OPTIMIZE = 'Optimize & Repair',
  SECURITY = 'Security',
  ADVANCED = 'Other/Advanced'
}

export type Language = 'EN' | 'AR';

export interface PDFTool {
  id: string;
  name: string;
  nameAR?: string;
  description: string;
  descriptionAR?: string;
  icon: ReactNode;
  category: ToolCategory;
  trending?: boolean;
}

export interface FileState {
  file: File;
  previewUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
