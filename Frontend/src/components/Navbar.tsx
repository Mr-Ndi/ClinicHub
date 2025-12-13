import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="text-slate-900 text-2xl font-bold tracking-tight">Clinic<span className="text-blue-600">Hub</span></span>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={`font-medium text-sm transition-colors relative group ${isActive('/') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                            Home
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to="/services" className={`font-medium text-sm transition-colors relative group ${isActive('/services') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                            Services
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive('/services') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to="/doctors" className={`font-medium text-sm transition-colors relative group ${isActive('/doctors') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                            Doctors
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive('/doctors') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to="/about" className={`font-medium text-sm transition-colors relative group ${isActive('/about') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                            About
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                        <Link to="/contact" className={`font-medium text-sm transition-colors relative group ${isActive('/contact') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
                            Contact
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login" className="text-slate-700 hover:text-blue-600 font-semibold px-4 py-2 transition-colors">
                            Login
                        </Link>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-0.5">
                            Book Appointment
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                    <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        Home
                    </Link>
                    <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        Services
                    </Link>
                    <Link to="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        Doctors
                    </Link>
                    <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        About
                    </Link>
                    <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">
                        Contact
                    </Link>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-3">
                        <Link to="/login" className="w-full text-center text-slate-700 font-semibold py-2">
                            Login
                        </Link>
                        <button className="w-full text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
