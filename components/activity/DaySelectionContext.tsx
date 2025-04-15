import { createContext, useContext, useState } from 'react';

type DayContextType = {
  selectedDay: number | null;
  setSelectedDay: (dayStartMs: number | null) => void;
};

const DaySelectionContext = createContext<DayContextType>({
  selectedDay: null,
  setSelectedDay: (dayStartMs: number | null) => { },
});

export const useDaySelection = () => useContext(DaySelectionContext);

export const DaySelectionProvider = ({ children }: any) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <DaySelectionContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </DaySelectionContext.Provider>
  );
};