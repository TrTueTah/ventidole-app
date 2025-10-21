import { useState } from "react";

export interface ChooseIdolState {
  id: number;
  title: string;
  isSelected: boolean;
  image: { uri: string };
}

export const useChooseIdols = () => {
  const [listOfIdols, setListOfIdols] = useState<ChooseIdolState[]>([
    {
      id: 1,
      title: 'Idol 1',
      isSelected: false,
      image: { uri: 'https://placehold.co/400' },
    },
    {
      id: 2,
      title: 'Idol 2',
      isSelected: false,
      image: { uri: 'https://placehold.co/400' },
    },
    {
      id: 3,
      title: 'Idol 3',
      isSelected: false,
      image: { uri: 'https://placehold.co/400' },
    },
    {
      id: 4,
      title: 'Idol 4',
      isSelected: false,
      image: { uri: 'https://placehold.co/400' },
    },
    {
      id: 5,
      title: 'Idol 5',
      isSelected: false,
      image: { uri: 'https://placehold.co/400' },
    },
    {
      id: 6,
      title: 'Idol 6',
      isSelected: false,
      image: { uri: 'https://placehold.co/400' },
    },    
    // Add more idols as needed
  ]);

  const handleSelectIdols = (id: number) => {
    const updatedIdols = listOfIdols.map(idol =>
      idol.id === id ? { ...idol, isSelected: !idol.isSelected } : idol,
    );
    setListOfIdols(updatedIdols);
  };

  const handleNext = () => {
    // Handle the next action, e.g., navigate to the next screen
  }

  return {
    listOfIdols,
    handleSelectIdols,
    handleNext,
  };
}