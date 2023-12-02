import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  vehicleInfo: null,
}

export const vehicleDashboardSlice = createSlice({
  name: 'vehicleDashboard',
  initialState,
  reducers: {
    setVehicleInfo: (state, action) => {
      state.vehicleInfo = action.payload;
    }
  },
});

const { actions, reducer } = vehicleDashboardSlice;

export const { 
  setVehicleInfo
} = actions;

export default reducer;