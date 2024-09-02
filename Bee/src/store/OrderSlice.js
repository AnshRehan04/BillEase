// ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const OrderSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
        },
        clearOrders: (state) => {
            return [];
        }
    }
});

export const { addOrder, clearOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
