import { CategoryType } from "..";

declare enum Common {
  ALL = "all"
}

export declare const ProjectsCategories: {
  ALL: Common.ALL;
  Art: CategoryType.Art;
  Comics: CategoryType.Comics;
  Crafts: CategoryType.Crafts;
  Dance: CategoryType.Dance;
  Design: CategoryType.Design;
  Fashion: CategoryType.Fashion;
  FilmAndVideo: CategoryType.FilmAndVideo;
  Food: CategoryType.Food;
  Games: CategoryType.Games;
  Journalism: CategoryType.Journalism;
  Music: CategoryType.Music;
  Photography: CategoryType.Photography;
  Publishing: CategoryType.Publishing;
  Technology: CategoryType.Technology;
  Theater: CategoryType.Theater;
};

export declare type ProjectsCategories = CategoryType | Common;