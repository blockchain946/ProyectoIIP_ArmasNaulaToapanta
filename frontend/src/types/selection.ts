export interface Interview {
  date: string;
  interviewer: string;
  notes: string;
  recommendation: 'APPROVE' | 'REJECT';
}

export interface Evaluation {
  type: string;
  score: number;
  feedback: string;
  date: string;
}

export interface SelectionDetail {
  id: string;
  vacancy: {
    position: string;
    department: string;
    salary: number;
  };
  candidate: {
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  evaluations: Evaluation[];
  interview: Interview;
}

export interface Selection {
  id: string;
  vacancyPosition: string;
  candidateName: string;
  status: string;
  evaluationScore: number;
  interviewDate: string;
} 