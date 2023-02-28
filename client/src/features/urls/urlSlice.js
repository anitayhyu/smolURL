import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import urlService from "./urlService";

const initialState = {
  urls: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create short url by authenticated user
export const createUrl = createAsyncThunk(
  "urls/create",
  async (urlData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await urlService.createUrl(urlData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get short urls by authenticated user
export const getShortUrls = createAsyncThunk(
  "urls/shorturls",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await urlService.getShortUrls(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create short url for non-authenticated user
export const createPublicUrl = createAsyncThunk(
  "urls/createpublic",
  async (urlData, thunkAPI) => {
    try {
      return await urlService.createPublicUrl(urlData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get short url for non-authenticated users
export const getPublicUrl = createAsyncThunk(
  "urls/getPublicUrl",
  async (urlData, thunkAPI) => {
    try {
      return await urlService.getPublicUrl(urlData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls.push(action.payload);
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getShortUrls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShortUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls = action.payload;
      })
      .addCase(getShortUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPublicUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPublicUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls = action.payload;
      })
      .addCase(createPublicUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPublicUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls = action.payload;
      })
      .addCase(getPublicUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = urlSlice.actions;
export default urlSlice.reducer;
