import { Product } from '../models/models';

export const getProductInfo = async (): Promise<Product[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}stackline_frontend_assessment_data_2021.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }
  return response.json();
};
