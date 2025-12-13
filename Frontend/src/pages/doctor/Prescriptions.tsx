
const Prescriptions = () => {
    const prescriptions = [
        { id: 1, patient: 'John Doe', medication: 'Amoxicillin 500mg', dosage: '1 tablet 3x daily', duration: '7 days', date: 'Dec 14, 2025', status: 'Active' },
        { id: 2, patient: 'Jane Smith', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', duration: '30 days', date: 'Dec 12, 2025', status: 'Active' },
        { id: 3, patient: 'Robert Brown', medication: 'Metformin 500mg', dosage: '1 tablet 2x daily', duration: '90 days', date: 'Nov 28, 2025', status: 'Active' },
        { id: 4, patient: 'Emily Davis', medication: 'Ibuprofen 400mg', dosage: 'As needed for pain', duration: '5 days', date: 'Dec 05, 2025', status: 'Expired' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Prescriptions</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    New Prescription
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Medication</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dosage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date Issued</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {prescriptions.map((prescription) => (
                            <tr key={prescription.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                                    {prescription.patient}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    <div className="font-medium text-slate-900">{prescription.medication}</div>
                                    <div className="text-xs text-slate-500">{prescription.duration}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {prescription.dosage}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {prescription.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                                        {prescription.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">Refill</button>
                                    <button className="text-slate-400 hover:text-slate-600">Print</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Prescriptions;
