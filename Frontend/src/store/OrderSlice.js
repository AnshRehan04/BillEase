import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'ordered',
    initialState: [],
    reducers: {
        updateOrder: (state, action) => {
            const index = state.findIndex(order => order.table === action.payload.table);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
