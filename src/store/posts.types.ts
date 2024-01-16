declare global {
  interface Post {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
  }
}

export {}