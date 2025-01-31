import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductInfo } from '../api/productService';
import { Product } from '../models/models';

export interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

export const fetchProductInfo = createAsyncThunk('products/getProductInfo', async () => {
  return await getProductInfo();
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductInfo.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
