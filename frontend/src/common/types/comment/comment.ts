export interface Comment {
  id: string;
  author: {
    id: string;
    firstName: string;
    avatar: string;
    isOwner: boolean;
    isBacker: boolean;
    lastName: string;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
  parentCommentId: string;
}
