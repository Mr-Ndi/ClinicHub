import { useState } from 'react';

const PatientTelemedicine = () => {
    const [isInCall, setIsInCall] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const upcomingAppointment = {
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        time: '10:00 AM',
        date: 'Today',
        status: 'Ready to Join'
    };

    const handleJoinCall = () => {
        setIsInCall(true);
    };

    const handleEndCall = () => {
        setIsInCall(false);
        alert('Call ended.');
    };

    if (isInCall) {
        return (
            <div className="h-[calc(100vh-theme(spacing.32))] flex flex-col bg-slate-900 rounded-2xl overflow-hidden relative shadow-lg">
                {/* Doctor Video Placeholder */}
                <div className="flex-1 flex items-center justify-center bg-slate-800 relative">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">{upcomingAppointment.doctor}</h3>
                        <p className="text-slate-400">Connecting...</p>
                    </div>

                    {/* Self View (PIP) */}
                    <div className="absolute bottom-24 right-4 w-32 h-24 md:w-48 md:h-36 bg-slate-950 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
                        {!isVideoOff ? (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <span className="text-xs text-slate-500">You</span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" /></svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="h-20 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700 flex items-center justify-center gap-6 absolute bottom-0 w-full">
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
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Telemedicine</h1>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Ready for Call</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Upcoming Consultation</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">You have a scheduled video call with your doctor.</p>

                <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                            {upcomingAppointment.doctor[4]}
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-slate-900 dark:text-white">{upcomingAppointment.doctor}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{upcomingAppointment.specialty}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-slate-200 dark:border-slate-700 pt-4">
                        <span className="text-slate-600 dark:text-slate-400">Time: <span className="font-bold text-slate-900 dark:text-white">{upcomingAppointment.time}</span></span>
                        <span className="text-slate-600 dark:text-slate-400">Date: <span className="font-bold text-slate-900 dark:text-white">{upcomingAppointment.date}</span></span>
                    </div>
                </div>

                <button
                    onClick={handleJoinCall}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-3 mx-auto"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Join Video Call
                </button>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Please ensure your camera and microphone are working.</p>
            </div>
        </div>
    );
};

export default PatientTelemedicine;
