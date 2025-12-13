
const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className="text-2xl font-bold text-white">Clinic<span className="text-blue-500">Hub</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Providing world-class healthcare services with a focus on patient comfort and advanced medical technology. Your health is our mission.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social icons placeholders */}
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Our Doctors</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Departments</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Appointments</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Cardiology</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Neurology</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Pediatrics</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Emergency Care</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Newsletter</h3>
                        <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for the latest health tips and news.</p>
                        <form className="space-y-3">
                            <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} ClinicHub. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
