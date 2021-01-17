export interface PageEventsProps {
  prevClick: () => void;
  nextClick: () => void;
  currentChange: (value: Number) => void;
}