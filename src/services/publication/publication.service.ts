interface PublicationService {
  publishVacancy(requisitionId: string, channels: PublicationChannel[]): Promise<void>;
  
  notifyRecruitmentTeam(vacancyId: string): Promise<void>;
  
  closeVacancy(vacancyId: string): Promise<void>;
}

enum PublicationChannel {
  INTRANET,
  EXTERNAL_PORTALS,
  BOTH
} 