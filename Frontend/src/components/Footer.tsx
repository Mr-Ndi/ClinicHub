

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold text-blue-400">ClinicHub</span>
                        <p className="mt-4 text-slate-400 text-sm">
                            Providing world-class healthcare services with a focus on patient comfort and advanced medical technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-200">Quick Links</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Our Doctors</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Departments</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Appointments</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-200">Services</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cardiology</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Neurology</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pediatrics</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Emergency Care</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-200">Contact Us</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li className="flex items-start">
                                <span className="mr-2">📍</span>
                                <span>123 Health Avenue, Medical District, City, Country</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✉️</span>
                                <span>contact@clinichub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} ClinicHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
