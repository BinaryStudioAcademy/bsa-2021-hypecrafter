import { Project, Tag } from '../../common/types';

export interface ProjectItem extends Project {
  views: number;
}

export interface TagWithQuantity extends Tag {
  quantity: number;
}
