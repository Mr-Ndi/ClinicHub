import { useNavigate } from 'react-router-dom';

const Patients = () => {
    const navigate = useNavigate();
    const patients = [
        { id: 1, name: 'John Doe', age: 35, gender: 'Male', lastVisit: 'Dec 10, 2025', condition: 'Hypertension' },
        { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', lastVisit: 'Dec 12, 2025', condition: 'Pregnancy' },
        { id: 3, name: 'Robert Brown', age: 45, gender: 'Male', lastVisit: 'Nov 28, 2025', condition: 'Diabetes' },
        { id: 4, name: 'Emily Davis', age: 62, gender: 'Female', lastVisit: 'Dec 05, 2025', condition: 'Arthritis' },
        { id: 5, name: 'Michael Wilson', age: 50, gender: 'Male', lastVisit: 'Dec 14, 2025', condition: 'High Cholesterol' },
        { id: 6, name: 'Sarah Miller', age: 24, gender: 'Female', lastVisit: 'Dec 01, 2025', condition: 'Asthma' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Patients Directory</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search patients..."
                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                    />
                    <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((patient) => (
                    <div key={patient.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                {patient.name[0]}
                            </div>
                            <button className="text-slate-400 hover:text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{patient.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{patient.age} Years • {patient.gender}</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Last Visit:</span>
                                <span className="text-slate-900 font-medium">{patient.lastVisit}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Condition:</span>
                                <span className="text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">{patient.condition}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                            className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Patients;
