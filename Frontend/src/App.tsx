import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/doctor/DashboardHome';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/services" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <Services />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/doctors" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <Doctors />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <Contact />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/login" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <Login />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/signup" element={
          <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
            <Navbar />
            <main className="flex-grow">
              <Signup />
            </main>
            <Footer />
          </div>
        } />

        {/* Doctor Dashboard Routes */}
        <Route path="/doctor" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          {/* Add other dashboard routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

