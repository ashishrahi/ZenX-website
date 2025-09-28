export interface IBanners  {
    id?:string;
  title: string;
  description: string;
  images: string[]; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}