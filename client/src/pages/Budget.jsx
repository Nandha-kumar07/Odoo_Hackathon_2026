import React from 'react';
import Layout from '../components/Layout';

const Budget = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-black text-slate-900 mb-4">Budget Tracker</h1>
                <p className="text-slate-500 font-bold text-lg">Manage your trip expenses here.</p>
            </div>
        </Layout>
    );
};

export default Budget;
