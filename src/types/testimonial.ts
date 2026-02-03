import { Asset } from "./common";

export interface TestimonialProps {
  heroImage: Asset[];
  review: string;
  rating: number;
  name: string;
  avatar: Asset[];
  position: string;
  isPublished: boolean;
}
export interface Testimonial extends TestimonialProps {
  publicId: string;
  slug: string;
}
