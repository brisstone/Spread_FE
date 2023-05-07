import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@/types/general';
import { authenticateUser } from '@/services';

interface AuthState {
  user: User | null;
  authStatus: 'authenticating' | 'unauthenticated' | 'authenticated';
}

const initialState: AuthState= {
  user: null,
  authStatus: 'authenticating',
};

export const authenticate = createAsyncThunk(
  'users/authenticateUser',
  async (thunkAPI) => {
    console.log('AUTHENTICATING IN THUNK..............................')
    const response = await authenticateUser();

    return response;
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<AuthState['authStatus']>) => {
      state.authStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state, action) => {
      state.authStatus = 'authenticating';
    })

    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.authStatus = 'authenticated';
    });

    builder.addCase(authenticate.rejected, (state, action) => {
      console.log('error in redux', action.error);
      console.log((action.error as any).response);
      // if (action.error.response.)
    })
  }
});

export const { setUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;