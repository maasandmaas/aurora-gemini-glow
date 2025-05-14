
import { Product } from '@/types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://fancymoissanite.com/wp-json/custom/v1/products');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
