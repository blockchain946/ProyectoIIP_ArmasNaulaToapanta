import { useState, useEffect } from 'react';
import { Candidate, Evaluation, Requisition, Vacancy } from '../types';

type ItemType = Candidate | Evaluation | Requisition | Vacancy;

export function useItemDetails<T extends ItemType>(
  itemId: string | undefined,
  storageKey: string
): T | null {
  const [item, setItem] = useState<T | null>(null);

  useEffect(() => {
    if (!itemId) return;

    const items = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const foundItem = items.find((i: T) => i.id === itemId);
    setItem(foundItem || null);
  }, [itemId, storageKey]);

  return item;
} 