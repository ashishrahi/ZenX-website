export interface ISubCategory  {
  _id:string;
  name: string;
  slug: string;
  description?: string;
  images: string[];
  categoryId: string
  createdAt: Date;
  updatedAt: Date;
  isDeleted:boolean;
  category:string;
}