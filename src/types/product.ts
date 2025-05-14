
export interface Product {
  id: number;
  name: string;
  slug: string;
  type: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  stock_quantity: number;
  sku: string;
  description: string;
  short_description: string;
  categories: string[];
  tags: string[];
  images: string[];
  attributes: ProductAttribute[];
  meta_data: {
    joice_enovathemes_label1?: string;
    joice_enovathemes_label1_color?: string;
    enovathemes_addons_features?: string;
    _moissanite_shapes?: string[];
    _custom_product_fields?: ProductCustomField[];
    _product_specifications?: ProductSpecification[];
    [key: string]: any;
  };
}

export interface ProductAttribute {
  name: string;
  options: number[];
  visible: boolean;
  variation: boolean;
}

export interface ProductCustomField {
  image: string;
  hover_image: string;
  color: string;
  color_name: string;
  price: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}
