interface CandidateService {
  registerCandidate(data: {
    name: string;
    email: string;
    resume: Buffer;
    vacancyId: string;
  }): Promise<Candidate>;
  
  filterCandidates(vacancyId: string, criteria: FilterCriteria): Promise<Candidate[]>;
  
  updateCandidateStatus(candidateId: string, status: CandidateStatus): Promise<void>;
} 