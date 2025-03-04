// Eventos del sistema
enum KafkaTopics {
  REQUISITION_CREATED = 'requisition.created',
  REQUISITION_APPROVED = 'requisition.approved',
  VACANCY_PUBLISHED = 'vacancy.published',
  CANDIDATE_REGISTERED = 'candidate.registered',
  EVALUATION_COMPLETED = 'evaluation.completed',
  INTERVIEW_SCHEDULED = 'interview.scheduled',
  CANDIDATE_SELECTED = 'candidate.selected'
}

interface KafkaProducer {
  publish<T>(topic: KafkaTopics, message: T): Promise<void>;
}

interface KafkaConsumer {
  subscribe(topic: KafkaTopics, handler: (message: any) => Promise<void>): void;
} 