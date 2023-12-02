import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedFleetId: null,
  selectedFleetVehiclesCount: 0,
  // NOTE: this value is hardcoded in the backend
  vehiclesSkip: 0,
  vehiclesTake: 10,
  vehiclesDistribution: [],
}

export const fleetManagementSlice = createSlice({
  name: 'fleetManagement',
  initialState,
  reducers: {
    setSelectedFleetId: (state, action) => {
      state.selectedFleetId = action.payload;
    },
    setSelectedFleetVehiclesCount: (state, action) => {
      state.selectedFleetVehiclesCount = action.payload;
    },
    setVehiclesSkip: (state, action) => {
      state.vehiclesSkip = action.payload;
    },
    setVehiclesTake: (state, action) => {
      state.vehiclesTake = action.payload;
    },
    setVehiclesDistribution: (state, action) => {
      state.vehiclesDistribution = action.payload;
    }
  },
});

const { actions, reducer } = fleetManagementSlice;

export const { 
  setSelectedFleetId,
  setSelectedFleetVehiclesCount,
  setVehiclesSkip,
  setVehiclesTake,
  setVehiclesDistribution
} = actions;

export default reducer;