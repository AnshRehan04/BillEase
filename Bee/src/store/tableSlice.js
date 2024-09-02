// store/tablesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tablesSlice = createSlice({
  name: 'tables',
  initialState: [
    { id: 0, title: "Table 1", status: "Vacant" },
    { id: 1, title: "Table 2", status: "Vacant" },
    { id: 2, title: "Table 3", status: "Vacant" },
    { id: 3, title: "Table 4", status: "Vacant" },
    { id: 4, title: "Table 5", status: "Vacant" },
    { id: 5, title: "Table 6", status: "Vacant" },
    { id: 6, title: "Table 7", status: "Vacant" },
    { id: 7, title: "Table 8", status: "Vacant" },
    { id: 8, title: "Table 9", status: "Vacant" },
    { id: 9, title: "Table 10", status: "Vacant" },
    { id: 10, title: "Table 11", status: "Vacant" },
    { id: 11, title: "Table 12", status: "Vacant" },
    { id: 12, title: "Table 13", status: "Vacant" },
    { id: 13, title: "Table 14", status: "Vacant" },
    { id: 14, title: "Table 15", status: "Vacant" },
    { id: 15, title: "Table 16", status: "Vacant" },
  ],
  reducers: {
    setTableStatus: (state, action) => {
      const { id, status } = action.payload;
      const table = state.find(table => table.id === id);
      if (table) {
        table.status = status;
      }
    }
  }
});

export const { setTableStatus } = tablesSlice.actions;
export default tablesSlice.reducer;
