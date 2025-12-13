

const Doctors = () => {
    const doctors = [
        {
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bio: "Expert in interventional cardiology with over 15 years of experience."
        },
        {
            name: "Dr. Michael Chen",
            specialty: "Neurologist",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bio: "Specializes in treating complex neurological disorders and stroke recovery."
        },
        {
            name: "Dr. Emily Davis",
            specialty: "Pediatrician",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bio: "Passionate about child health and preventive care for infants and children."
        },
        {
            name: "Dr. James Wilson",
            specialty: "Orthopedic Surgeon",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bio: "Renowned for sports medicine and minimally invasive joint replacement surgeries."
        },
        {
            name: "Dr. Linda Martinez",
            specialty: "Dermatologist",
            image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bio: "Expert in cosmetic and medical dermatology, focusing on skin health."
        },
        {
            name: "Dr. Robert Taylor",
            specialty: "General Practitioner",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            bio: "Dedicated to providing comprehensive primary care for families."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                        Meet Our <span className="text-blue-600">Doctors</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Our team of highly skilled and experienced medical professionals is here to take care of you.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-blue-600 font-semibold mb-1">{doctor.specialty}</p>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{doctor.name}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {doctor.bio}
                                </p>
                                <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
