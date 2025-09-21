export interface Category {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  description: string;
  createdAt: string; // or Date if you want to parse it
  updatedAt: string; // or Date
  __v: number;
}