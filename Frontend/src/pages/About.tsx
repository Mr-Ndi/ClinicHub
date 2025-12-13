

const About = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                        About <span className="text-blue-600">ClinicHub</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Dedicated to providing compassionate, world-class healthcare to our community.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To improve the health and well-being of the communities we serve by providing accessible, high-quality medical care with a personal touch. We strive to treat every patient with dignity, respect, and compassion.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To be the trusted leader in healthcare, recognized for clinical excellence, innovation, and our commitment to patient-centered care. We aim to set the standard for medical services in the region.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Compassion", desc: "We care for our patients with empathy and kindness." },
                            { title: "Excellence", desc: "We pursue the highest standards in medical care and safety." },
                            { title: "Integrity", desc: "We act with honesty and adhere to the highest ethical standards." }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-2xl">
                                    {value.title[0]}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                                <p className="text-slate-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* History/Story */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
                    <div className="md:flex items-center gap-12">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Founded in 2010, ClinicHub started as a small community clinic with a single doctor. Over the years, we have grown into a multi-specialty medical center, serving thousands of patients annually.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Today, we are proud to have a team of over 50 expert doctors and support staff, all working together to ensure you receive the best possible care.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Hospital Building"
                                className="rounded-2xl shadow-2xl opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
