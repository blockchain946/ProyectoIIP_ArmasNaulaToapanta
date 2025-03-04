export const MOCK_USERS = [
  // ... usuarios existentes ...
  {
    id: '4',
    email: 'ana.lopez@email.com',
    password: '123456',
    name: 'Ana López',
    role: 'POSTULANTE',
    status: 'ACTIVE',
  },
  {
    id: '5',
    email: 'pedro.martinez@email.com',
    password: '123456',
    name: 'Pedro Martínez',
    role: 'POSTULANTE',
    status: 'ACTIVE',
  },
];

export const MOCK_EVALUATIONS = [
  {
    id: '1',
    candidateId: '4', // Ana López
    type: 'TECHNICAL',
    score: 85,
    status: 'COMPLETED',
    date: '2024-03-05',
  },
  {
    id: '2',
    candidateId: '5', // Pedro Martínez
    type: 'TECHNICAL',
    score: 90,
    status: 'COMPLETED',
    date: '2024-03-06',
  },
]; 