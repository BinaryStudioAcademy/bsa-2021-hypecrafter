import { createRoutine } from 'redux-saga-routines';
import { Tag } from '../common/types';

export enum TagsActions {
  GET_TAGS = 'TAGS'
}
export const getTagsAction = createRoutine(TagsActions.GET_TAGS, {
  trigger: () => undefined,
  success: (tags: Tag[]) => tags,
  failure: (error: string) => error
});

export type GetTagsTriggerActionType = ReturnType<typeof getTagsAction.trigger>;
export type GetTagsSuccessActionType = ReturnType<typeof getTagsAction.success>;
export type GetTagsFailureActionType = ReturnType<typeof getTagsAction.failure>;
