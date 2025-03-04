export interface Requisition {
  id: string;
  position: string;
  department: string;
  salary: number;
  requirements: string[];
  functions: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comments?: string;
  created_at: Date;
  updated_at: Date;
} 