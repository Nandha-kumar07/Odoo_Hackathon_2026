import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { IndianRupee, TrendingUp, TrendingDown, Plane, Home, Utensils, Activity, Wallet, ChevronDown } from 'lucide-react';
import { tripService } from '../services/trips';
import { expenseService } from '../services/expenses';

const Budget = () => {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDat = async () => {
            try {
                const tripsData = await tripService.getAllTrips();
                setTrips(tripsData);
                if (tripsData.length > 0) {
                    const active = tripsData.find(t => t.status === 'ongoing') || tripsData[0];
                    setSelectedTrip(active);
                    const expensesData = await expenseService.getTripExpenses(active.id);
                    setExpenses(expensesData);
                }
            } catch (err) {
                console.error("Failed to load budget data", err);
            } finally {
                setLoading(false);
            }
        };
        loadDat();
    }, []);

    const handleTripChange = async (tripId) => {
        const trip = trips.find(t => t.id === parseInt(tripId));
        if (trip) {
            setSelectedTrip(trip);
            try {
                const expensesData = await expenseService.getTripExpenses(trip.id);
                setExpenses(expensesData);
            } catch (err) {
                console.error("Failed to fetch expenses", err);
            }
        }
    };

    const totalBudget = selectedTrip ? parseFloat(selectedTrip.budget || 0) : 0;
    const spent = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    const remaining = totalBudget - spent;
    const percentSpent = totalBudget > 0 ? (spent / totalBudget) * 100 : 0;

    // Group expenses by category
    const categoriesMap = expenses.reduce((acc, curr) => {
        const cat = curr.category || 'Other';
        if (!acc[cat]) acc[cat] = 0;
        acc[cat] += parseFloat(curr.amount);
        return acc;
    }, {});

    const categoryConfig = {
        'Transport': { icon: <Plane size={20} />, color: 'blue' },
        'Accommodation': { icon: <Home size={20} />, color: 'purple' },
        'Food': { icon: <Utensils size={20} />, color: 'amber' },
        'Activities': { icon: <Activity size={20} />, color: 'green' },
        'Other': { icon: <IndianRupee size={20} />, color: 'gray' }
    };

    const categories = Object.keys(categoriesMap).map(cat => ({
        name: cat,
        spent: categoriesMap[cat],
        budget: 0, // Individual category budgets not yet implemented in backend
        icon: categoryConfig[cat]?.icon || <IndianRupee size={20} />,
        color: categoryConfig[cat]?.color || 'gray'
    }));

    const getColorClasses = (color) => {
        const colors = {
            blue: { bg: 'bg-blue-500', light: 'bg-blue-100', text: 'text-blue-600' },
            purple: { bg: 'bg-purple-500', light: 'bg-purple-100', text: 'text-purple-600' },
            amber: { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-600' },
            green: { bg: 'bg-green-500', light: 'bg-green-100', text: 'text-green-600' },
            gray: { bg: 'bg-slate-500', light: 'bg-slate-100', text: 'text-slate-600' },
        };
        return colors[color] || colors.gray;
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto pb-12">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Budget Tracker</h1>
                        <p className="text-slate-500 font-medium">Manage your trip expenses and stay on budget.</p>
                    </div>
                    {trips.length > 0 && (
                        <div className="relative">
                            <select
                                onChange={(e) => handleTripChange(e.target.value)}
                                value={selectedTrip?.id || ''}
                                className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2.5 rounded-xl font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            >
                                {trips.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading budget data...</div>
                ) : !selectedTrip ? (
                    <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="font-bold mb-2">No trips found</p>
                        <p className="text-sm">Create a trip to track expenses.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Budget Overview */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Total Budget Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[24px] p-8 text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Wallet size={24} />
                                    </div>
                                    <div>
                                        <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">Total Budget</p>
                                        <h2 className="text-4xl font-black">₹{totalBudget.toLocaleString()}</h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingDown size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Spent</span>
                                        </div>
                                        <p className="text-2xl font-black">₹{spent.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">Remaining</span>
                                        </div>
                                        <p className="text-2xl font-black">₹{remaining.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span>{percentSpent.toFixed(0)}% Used</span>
                                        <span>{(100 - percentSpent).toFixed(0)}% Left</span>
                                    </div>
                                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white rounded-full transition-all duration-500"
                                            style={{ width: `${percentSpent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Category Breakdown */}
                            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Expense Categories</h3>
                                {categories.length > 0 ? (
                                    <div className="space-y-6">
                                        {categories.map((cat, idx) => {
                                            const totalCatBudget = cat.budget || totalBudget * 0.2; // Mock fallback
                                            const percent = totalCatBudget > 0 ? (cat.spent / totalCatBudget) * 100 : 0;
                                            const colors = getColorClasses(cat.color);
                                            return (
                                                <div key={idx}>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 ${colors.light} rounded-xl flex items-center justify-center ${colors.text}`}>
                                                                {cat.icon}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900">{cat.name}</p>
                                                                <p className="text-xs text-slate-500 font-medium">₹{cat.spent} spent</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full ${colors.bg} rounded-full`} style={{ width: `${Math.min(percent || 20, 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 font-medium text-center py-8">No expenses recorded yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Pie Chart */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6">Expense Distribution</h3>

                                {/* Simple CSS Pie Chart */}
                                <div className="relative w-48 h-48 mx-auto mb-6">
                                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                                            strokeDasharray={`${(1200 / 4200) * 251.2} 251.2`} strokeDashoffset="0" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20"
                                            strokeDasharray={`${(1800 / 4200) * 251.2} 251.2`} strokeDashoffset={`-${(1200 / 4200) * 251.2}`} />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20"
                                            strokeDasharray={`${(800 / 4200) * 251.2} 251.2`} strokeDashoffset={`-${((1200 + 1800) / 4200) * 251.2}`} />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20"
                                            strokeDasharray={`${(400 / 4200) * 251.2} 251.2`} strokeDashoffset={`-${((1200 + 1800 + 800) / 4200) * 251.2}`} />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-2xl font-black text-slate-900">₹{spent}</p>
                                        <p className="text-xs text-slate-500 font-bold">Total Spent</p>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="space-y-3">
                                    {categories.map((cat, idx) => {
                                        const colors = getColorClasses(cat.color);
                                        return (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 ${colors.bg} rounded-full`}></div>
                                                    <span className="text-sm font-medium text-slate-600">{cat.name}</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-900">₹{cat.spent}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Daily Budget Recommendation */}
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-[24px] p-6 border border-amber-200">
                                <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2">Daily Recommendation</h4>
                                <p className="text-3xl font-black text-amber-900 mb-2">₹120</p>
                                <p className="text-sm text-amber-700 font-medium">Based on remaining budget for 35 days</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Budget;
