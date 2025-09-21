export interface IBlog {
  id: string;
  category: string;
  title: string;
  description: string;
  // link?: string; // optional since it’s commented out
  image: string; // or the type of `images.wellBeing` if it’s not a string
  tags: string[];
}
