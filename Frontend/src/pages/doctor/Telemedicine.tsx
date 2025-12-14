import { useState } from 'react';

const Telemedicine = () => {
    const [activeCall, setActiveCall] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const waitingPatients = [
        { id: 1, name: 'Alice Smith', time: '10:00 AM', reason: 'Follow-up', status: 'Waiting' },
        { id: 2, name: 'Bob Jones', time: '10:30 AM', reason: 'Consultation', status: 'Scheduled' },
    ];

    const handleStartCall = (id: number) => {
        setActiveCall(id);
    };

    const handleEndCall = () => {
        setActiveCall(null);
        alert('Call ended.');
    };

    return (
        <div className="h-[calc(100vh-theme(spacing.32))] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Telemedicine Console</h1>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">System Online</span>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {/* Main Video Area */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden relative shadow-lg flex flex-col">
                    {activeCall ? (
                        <>
                            {/* Patient Video Placeholder */}
                            <div className="flex-1 flex items-center justify-center bg-slate-800 relative">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Alice Smith</h3>
                                    <p className="text-slate-400">00:12:45</p>
                                </div>

                                {/* Self View (PIP) */}
                                <div className="absolute bottom-4 right-4 w-48 h-36 bg-slate-950 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
                                    {!isVideoOff ? (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                            <span className="text-xs text-slate-500">You</span>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" /></svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="h-20 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700 flex items-center justify-center gap-6">
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
                                >
                                    {isMuted ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" /></svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsVideoOff(!isVideoOff)}
                                    className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
                                >
                                    {isVideoOff ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" /></svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    )}
                                </button>
                                <button
                                    onClick={handleEndCall}
                                    className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Active Call</h3>
                            <p>Select a patient from the waiting list to start a consultation.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar / Waiting Room */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="font-bold text-slate-900 dark:text-white">Waiting Room</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {waitingPatients.map((patient) => (
                            <div key={patient.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{patient.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{patient.reason}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${patient.status === 'Waiting' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                                        {patient.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {patient.time}
                                    </span>
                                    <button
                                        onClick={() => handleStartCall(patient.id)}
                                        disabled={!!activeCall}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeCall ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                    >
                                        Start Call
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Telemedicine;
