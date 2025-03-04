import { Selection, SelectionDetail } from '../types/selection';

export const getSelections = (): Selection[] => {
  const selections = localStorage.getItem('selections');
  return selections ? JSON.parse(selections) : [];
};

export const getSelectionById = (id: string): SelectionDetail | null => {
  const selections = localStorage.getItem('selections');
  if (!selections) return null;
  
  const selectionsList = JSON.parse(selections);
  return selectionsList.find((s: SelectionDetail) => s.id === id) || null;
};

export const updateSelectionStatus = (id: string, status: string): void => {
  const selections = localStorage.getItem('selections');
  if (!selections) return;

  const selectionsList = JSON.parse(selections);
  const updatedSelections = selectionsList.map((s: SelectionDetail) =>
    s.id === id ? { ...s, status } : s
  );

  localStorage.setItem('selections', JSON.stringify(updatedSelections));
}; 