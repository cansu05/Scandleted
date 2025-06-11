import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serializeCart = (rawCart: any) => {
  if (!rawCart) return null;

  return {
    ...rawCart,
    cartItems: Array.isArray(rawCart.cartItems)
      ? rawCart.cartItems.map((item: any) => ({
          ...item,
          createdAt: item?.createdAt
            ? new Date(item.createdAt).toISOString()
            : null,
          updatedAt: item?.updatedAt
            ? new Date(item.updatedAt).toISOString()
            : null,
          product: item?.product
            ? {
                ...item.product,
                createdAt: item.product.createdAt
                  ? new Date(item.product.createdAt).toISOString()
                  : null,
                updatedAt: item.product.updatedAt
                  ? new Date(item.product.updatedAt).toISOString()
                  : null,
              }
            : null,
        }))
      : [],
    createdAt: rawCart.createdAt
      ? new Date(rawCart.createdAt).toISOString()
      : null,
    updatedAt: rawCart.updatedAt
      ? new Date(rawCart.updatedAt).toISOString()
      : null,
  };
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/cart");
      return res.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Cart fetch failed");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, amount }: { productId: string; amount: number },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("/api/cart/add", { productId, amount });
      return res.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Cart add failed"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ cartItemId }: { cartItemId: string }, thunkAPI) => {
    try {
      const res = await axios.post("/api/cart/remove", { cartItemId });
      return res.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Remove failed"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { cartItemId, amount }: { cartItemId: string; amount: number },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("/api/cart/update", { cartItemId, amount });
      return res.data.cart;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Update failed"
      );
    }
  }
);

interface CartState {
  items: any[];
  cartTotal: number;
  tax: number;
  shipping: number;
  orderTotal: number;
  numItemsInCart: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  cartTotal: 0,
  tax: 0,
  shipping: 0,
  orderTotal: 0,
  numItemsInCart: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartManually: (state, action) => {
      const cart = serializeCart(action.payload);
      state.items = cart.cartItems;
      state.cartTotal = cart.cartTotal;
      state.tax = cart.tax;
      state.shipping = cart.shipping;
      state.orderTotal = cart.orderTotal;
      state.numItemsInCart = cart.numItemsInCart;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const cart = serializeCart(action.payload);
        state.items = cart.cartItems;
        state.cartTotal = cart.cartTotal;
        state.tax = cart.tax;
        state.shipping = cart.shipping;
        state.orderTotal = cart.orderTotal;
        state.numItemsInCart = cart.numItemsInCart;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const cart = serializeCart(action.payload);
        state.loading = false;
        state.items = cart.cartItems;
        state.cartTotal = cart.cartTotal;
        state.numItemsInCart = cart.numItemsInCart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const cart = serializeCart(action.payload);
        state.items = cart.cartItems;
        state.cartTotal = cart.cartTotal;
        state.tax = cart.tax;
        state.shipping = cart.shipping;
        state.orderTotal = cart.orderTotal;
        state.numItemsInCart = cart.numItemsInCart;
        state.loading = false;
        state.error = null;
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Unexpected error occurred while removing cart item";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const cart = serializeCart(action.payload);
        state.items = cart.cartItems;
        state.cartTotal = cart.cartTotal;
        state.tax = cart.tax;
        state.shipping = cart.shipping;
        state.orderTotal = cart.orderTotal;
        state.numItemsInCart = cart.numItemsInCart;
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Unexpected error occurred while updating cart item";
      });
  },
});

export const { setCartManually } = cartSlice.actions;
export default cartSlice.reducer;
