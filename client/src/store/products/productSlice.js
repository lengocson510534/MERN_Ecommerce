import { createSlice } from "@reduxjs/toolkit"
import { getNewProducts } from './asyncAction'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    newProducts: null,
    isLoading: false,
    errorMessage: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewProducts.pending, (state) => {
      state.isLoading = true
      // state.errorMessage = '' // Reset lỗi mỗi lần request mới
    })
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.newProducts = action.payload
    })
    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })
  }
})

// export const { } = productSlice.actions
export default productSlice.reducer