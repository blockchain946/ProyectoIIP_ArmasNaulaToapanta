import { Requisition, RequisitionStatus } from '../../types';

interface RequisitionService {
  createRequisition(data: {
    position: string;
    department: string;
    salary: number;
    requirements: string[];
    functions: string[];
  }): Promise<Requisition>;
  
  reviewRequisition(id: string, status: 'APPROVED' | 'REJECTED', comments?: string): Promise<void>;
  
  getRequisitionStatus(id: string): Promise<RequisitionStatus>;
}

export default RequisitionService; 