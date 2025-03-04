export enum RequisitionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum VacancyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED'
}

export enum CandidateStatus {
  REGISTERED = 'REGISTERED',
  IN_EVALUATION = 'IN_EVALUATION',
  INTERVIEWED = 'INTERVIEWED',
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED'
}

export interface Requisition {
  id: string;
  position: string;
  department: string;
  salary: number;
  requirements: string[];
  functions: string[];
  status: RequisitionStatus;
}

export interface Vacancy {
  id: string;
  position: string;
  department: string;
  salary: number;
  requirements: string[];
  functions: string[];
  status: 'PUBLISHED' | 'DRAFT' | 'CLOSED';
  requisitionId: string;
  createdAt: string;
  publishedAt?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'PENDING' | 'IN_PROCESS' | 'APPROVED' | 'REJECTED';
  evaluations: Array<{
    id: string;
    type: string;
    score: number;
    feedback: string;
    date: string;
  }>;
  appliedVacancies: Array<{
    id: string;
    position: string;
    department: string;
    status: string;
  }>;
}

export interface Evaluation {
  id: string;
  candidateId: string;
  candidateName: string;
  vacancyPosition: string;
  type: string;
  score: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  questions: Array<{
    id: string;
    question: string;
    expectedAnswer?: string;
  }>;
  date: string;
  comments?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'GERENTE' | 'DIRECTOR_RRHH' | 'POSTULANTE';
  status?: 'ACTIVE' | 'PENDING' | 'INACTIVE';
}

export interface ApplicationFormValues {
  name: string;
  email: string;
  phone: string;
  experience: string;
  about: string;
  password: string;
} 