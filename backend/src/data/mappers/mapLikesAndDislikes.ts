export const mapLikesAndDislikes = (
  { likes, dislikes } : { likes: string, dislikes: string }
) => ({ likes: Number(likes), dislikes: Number(dislikes) });
