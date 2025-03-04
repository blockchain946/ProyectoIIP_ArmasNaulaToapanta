export enum RequisitionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum CandidateStatus {
  REGISTERED = 'REGISTERED',
  IN_EVALUATION = 'IN_EVALUATION',
  INTERVIEWED = 'INTERVIEWED',
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED'
}

export enum VacancyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED'
}

export interface Requisition {
  id: string;
  position: string;
  department: string;
  salary: number;
  requirements: string[];
  functions: string[];
  status: RequisitionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  resume: Buffer;
  status: CandidateStatus;
  vacancyId: string;
}

export interface Evaluation {
  id: string;
  candidateId: string;
  type: string;
  score: number;
  comments: string;
  date: Date;
}

export interface TestResults {
  score: number;
  answers: Record<string, any>;
  comments: string;
}

export interface EvaluationReport {
  candidateId: string;
  evaluations: Evaluation[];
  overallScore: number;
  recommendation: string;
}

export interface FilterCriteria {
  minExperience?: number;
  skills?: string[];
  education?: string[];
  status?: CandidateStatus[];
} 