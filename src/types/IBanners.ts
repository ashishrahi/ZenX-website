export interface IBanners  {
    id?:string;
  title: string;
  description: string;
  images: string[]; // change to array
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}