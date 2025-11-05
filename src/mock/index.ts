export const POST_DATA = {
  author: {
    id: 'a1',
    name: 'John Doe',
    avatarUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  id: '1',
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
  imageUrl:
    'https://res.cloudinary.com/dsc9afexw/image/upload/v1758008644/iK-Cji6J73Q-HD_nmbkfm.jpg',
  totalComment: 12120,
  totalLike: 3345,
  createdAt: 1761749452,
};

export const COMMENTS = Array.from({ length: 6 }).map((_, i) => ({
  id: `c${i}`,
  author: {
    id: 'a1',
    name: 'John Doe',
    avatarUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
  totalLike: 25,
  totalReply: 10,
  createdAt: 1761749452,
}));

export const REPLIES = Array.from({ length: 4 }).map((_, i) => ({
  id: `r${i}`,
  author: {
    id: 'a2',
    name: 'Jane Smith',
    avatarUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  content: `This is a reply to the comment. It provides additional insights and feedback.`,
  totalLike: 5,
  createdAt: 1761749452,
}));