
interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  catName: string;
  createdAt: string ;
  links: string[];
  authorEmail: string;
  publicId: string;
  imageUrl: string;
}

interface getPost {
  id: string; 
  slug: string;
   title: string; 
   content: string; 
   imageUrl: string | null; 
   publicId: string | null; 
   catName: string | null; 
   authorEmail: string; 
   links: string[]; 
   createdAt: Date;
}

interface Category {
  id: string;
  catName: string;
}





export type { Post, Category, getPost };