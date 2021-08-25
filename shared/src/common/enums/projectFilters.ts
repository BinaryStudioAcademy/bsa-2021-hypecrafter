import { CategoryType } from '.';

enum Common {
  ALL = 'all',
}

export enum ProjectsSort {
  NAME = 'name',
  DATE = 'date',
}

export enum ProjectsFilter {
  ALL = 'all',
  FAVORITE = 'favorite',
  INVESTED = 'invested',
  OWN = 'own',
}

export const ProjectsCategories = { ...CategoryType, ...Common };
export type ProjectsCategories = CategoryType | Common;
