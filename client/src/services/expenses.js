import api from './api';

export const expenseService = {
    // Get trip expenses
    getTripExpenses: async (tripId) => {
        const response = await api.get(`/expenses/trip/${tripId}`);
        return response.data.expenses;
    },

    // Add expense
    addExpense: async (expenseData) => {
        const response = await api.post('/expenses', expenseData);
        return response.data.expense;
    },

    // Get expense summary
    getExpenseSummary: async (tripId) => {
        const response = await api.get(`/expenses/summary/${tripId}`);
        return response.data.summary;
    },
};

export default expenseService;
