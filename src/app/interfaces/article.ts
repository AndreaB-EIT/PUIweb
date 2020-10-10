export interface Article {
  id: number;
  id_user: string; // Who wrote the article
  abstract: string;
  subtitle: string;
  body: string;
  update_date: string;
  category: string;
  title: string;
  image_data: string;
  image_media_type: string;
  thumbnail_image: string;
  thumbnail_media_type: string;
}
