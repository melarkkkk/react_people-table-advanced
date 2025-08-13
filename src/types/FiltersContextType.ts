import { Sex } from './Sex';

export interface FiltersContextType {
  query: string;
  sex: Sex;
  centuries: string[];
  sortField: string;
  sortOrder: string;
  updateSearchParams: () => void;
}
