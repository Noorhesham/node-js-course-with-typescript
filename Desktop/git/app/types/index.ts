export interface ProductProps {
  id: string;
  product_name: string;
  quantity: number;
  price_starts_from: number;
  food_preference: string;
  average_rating: number;
  rating_count: number;
  img_url: string;
  description: string;
  ranking: number;
  is_featured: boolean;
  is_sponsored: boolean;
  parent_category: string;
  child_category: string;
  blurDataURL: string;
}
export interface VarianceProps {
  ctr: number;
  id: string;
  is_accessible_online: boolean;
  is_accessible_pos: boolean;
  is_bestseller: boolean;
  is_required: boolean;
  maximum_selection: number;
  minimum_selection: number;
  product_id: string;
  store_id: string;
  variation_name: string;
  variation_value:[VariationValue]
}
export interface VariationValue {
  id: string;
  variation_value_name: string;
  is_bestseller: boolean;
  is_accessible_online: boolean;
  is_accessible_pos: boolean;
  product_variations_id: string;
  store_id: string;
  ctr: number;
}
