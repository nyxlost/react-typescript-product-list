import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axiosInstance from '../../axiosConfig';
import { Product } from '../../interfaces/interfaceProduct';
import { ProductState } from '../../interfaces/interfaceProduct'

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axiosInstance.get('https://dummyjson.com/products');
  const products = response.data.products.map((product: Product) => ({
    ...product,
    totalPrice: (product.price * product.stock).toFixed(2),
  }));
  return products;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export default productSlice.reducer;
