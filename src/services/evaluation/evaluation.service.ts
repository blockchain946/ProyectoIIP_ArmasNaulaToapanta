interface EvaluationService {
  schedulePsychometricTest(candidateId: string): Promise<Evaluation>;
  
  recordTestResults(evaluationId: string, results: TestResults): Promise<void>;
  
  generateEvaluationReport(candidateId: string): Promise<EvaluationReport>;
} 