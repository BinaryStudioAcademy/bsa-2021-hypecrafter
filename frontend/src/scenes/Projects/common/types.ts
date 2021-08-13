import { FilterValues, SortValues } from './enums';

export interface Project {
  ID: string;
  Name: string;
  Description: string;
  isActive: boolean;
  Goal: number;
  StartDate: string;
  FinishDate: string | null;
  TotalViews: number;
  MinutesToRead: number;
  TotalInteractionTime: number;
  Region: string;
  CreatedAt: string;
  UpdatedAt: string | null;
  DeletedAt: string | null;
  CategoryID: string;
  Category: string;
  AuthorID: string;
  isFavorite: boolean;
  isInvested: boolean;
  isOwn: boolean;
}

export interface FilterFormData {
  sort: SortValues;
  filter: FilterValues;
}
