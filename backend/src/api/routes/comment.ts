/* eslint-disable */
import MicroMq from 'micromq';
import { Comment } from '../../data/entities';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init =
  ({ commentService }: Services, path: string) =>
  (app: MicroMq) =>
    app.post(
      path,
      wrap<Empty, Comment, Comment, Empty>((req) =>
        commentService.createComment(req.body)
      )
    );

export default init;
