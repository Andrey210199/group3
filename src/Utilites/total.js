export const isLiked = (likes, userId) =>  likes?.some(idLike => idLike === userId);

