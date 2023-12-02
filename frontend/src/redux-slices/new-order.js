import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vehicleInfo: null,
  vehicleServices: null,
}

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    setVehicleInfo: (state, action) => {
      state.vehicleInfo = action.payload;
    },
    setVehicleServices: (state, action) => {
      state.vehicleServices = action.payload;
    }
  },
});

const { actions, reducer } = newOrderSlice;

export const { 
  setVehicleInfo,
  setVehicleServices,
} = actions;

export default reducer;