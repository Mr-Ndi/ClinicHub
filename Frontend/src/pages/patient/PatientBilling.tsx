
const PatientBilling = () => {
    const bills = [
        { id: 1, service: 'General Checkup', date: 'Dec 18, 2025', amount: '$150.00', status: 'Pending' },
        { id: 2, service: 'Blood Test (CBC)', date: 'Dec 14, 2025', amount: '$45.00', status: 'Paid' },
        { id: 3, service: 'X-Ray Chest', date: 'Dec 12, 2025', amount: '$85.00', status: 'Paid' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Billing & Payments</h1>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                        {bills.map((bill) => (
                            <tr
                                key={bill.id}
                                onClick={() => alert(`Bill Details:\nService: ${bill.service}\nAmount: ${bill.amount}\nDate: ${bill.date}\nStatus: ${bill.status}`)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-white">
                                    {bill.service}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                                    {bill.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                                    {bill.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${bill.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'}`}>
                                        {bill.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {bill.status === 'Pending' ? (
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                            Pay Now
                                        </button>
                                    ) : (
                                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Download Invoice</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientBilling;
