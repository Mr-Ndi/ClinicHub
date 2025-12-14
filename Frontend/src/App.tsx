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
import Appointments from './pages/doctor/Appointments';
import Patients from './pages/doctor/Patients';
import Prescriptions from './pages/doctor/Prescriptions';
import MedicalRecords from './pages/doctor/MedicalRecords';
import Profile from './pages/doctor/Profile';
import PatientProfileDoctor from './pages/doctor/PatientProfile';

import PatientDashboardLayout from './layouts/PatientDashboardLayout';
import PatientDashboardHome from './pages/patient/PatientDashboardHome';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientMedicalRecords from './pages/patient/PatientMedicalRecords';
import PatientPrescriptions from './pages/patient/PatientPrescriptions';
import PatientBilling from './pages/patient/PatientBilling';
import PatientProfilePatient from './pages/patient/PatientProfile';

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
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientProfileDoctor />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Patient Dashboard Routes */}
        <Route path="/patient" element={<PatientDashboardLayout />}>
          <Route path="dashboard" element={<PatientDashboardHome />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="records" element={<PatientMedicalRecords />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="billing" element={<PatientBilling />} />
          <Route path="profile" element={<PatientProfilePatient />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
