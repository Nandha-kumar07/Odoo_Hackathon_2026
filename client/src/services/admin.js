import api from './api';

export const adminService = {
    // Get platform statistics
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    }
};

export default adminService;
