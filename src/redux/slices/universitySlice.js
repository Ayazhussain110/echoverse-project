import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import themeService from '../../services/themeService';

export const fetchUniversityTheme = createAsyncThunk(
  'university/fetchTheme',
  async (universityName, { rejectWithValue }) => {
    try {
      const theme = themeService.getTheme(universityName);
      return theme;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyUniversityTheme = createAsyncThunk(
  'university/applyTheme',
  async (universityName, { rejectWithValue }) => {
    try {
      const theme = themeService.applyTheme(universityName);
      localStorage.setItem('universityTheme', universityName);
      return theme;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const universitySlice = createSlice({
  name: 'university',
  initialState: {
    currentTheme: themeService.currentTheme || themeService.themes.default,
    availableUniversities: themeService.getAvailableUniversities(),
    loading: false,
    error: null
  },
  reducers: {
    resetUniversityTheme: (state) => {
      state.currentTheme = themeService.resetTheme();
      localStorage.removeItem('universityTheme');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversityTheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUniversityTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTheme = action.payload;
      })
      .addCase(fetchUniversityTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyUniversityTheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyUniversityTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTheme = action.payload;
      })
      .addCase(applyUniversityTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetUniversityTheme } = universitySlice.actions;
export default universitySlice.reducer;