
# ClinicHub Frontend

A modern healthcare management dashboard built with React, TypeScript, Vite, and Tailwind CSS.

---

## Table of Contents

- [Features](#features)
- [Pages & Structure](#pages--structure)
- [User Roles & Permissions](#user-roles--permissions)
- [API Endpoints](#api-endpoints)
- [Setup & Development](#setup--development)
- [Contributing](#contributing)

---

## Features

- Patient, Doctor, and Admin dashboards
- Appointment booking and management
- Prescription and medical record tracking
- User authentication (login/signup)
- Responsive, accessible UI
- Theme support (light/dark)
- Role-based navigation and permissions

---

## Pages & Structure

- **Public Pages:**
  - `/` Home
  - `/about` About
  - `/services` Services
  - `/doctors` Doctors List
  - `/contact` Contact
  - `/login` Login
  - `/signup` Signup

- **Patient Dashboard:**
  - `/patient/dashboard` Overview
  - `/patient/appointments` My Appointments
  - `/patient/prescriptions` My Prescriptions
  - `/patient/medical-records` My Medical Records
  - `/patient/billing` Billing
  - `/patient/profile` Profile
  - `/patient/telemedicine` Telemedicine

- **Doctor Dashboard:**
  - `/doctor/dashboard` Overview
  - `/doctor/appointments` Appointments
  - `/doctor/patients` Patient List
  - `/doctor/patient-profile/:id` Patient Profile
  - `/doctor/prescriptions` Prescriptions
  - `/doctor/medical-records` Medical Records
  - `/doctor/profile` Profile
  - `/doctor/telemedicine` Telemedicine

- **Admin Dashboard:**
  - `/admin/dashboard` Overview
  - `/admin/doctors` Doctor Management
  - `/admin/patients` Patient Management
  - `/admin/profile` Profile
  - `/admin/settings` Settings

---

## User Roles & Permissions

- **Patient:**  
  Can view and manage their own appointments, prescriptions, records, billing, and profile.

- **Doctor:**  
  Can view/manage their appointments, see assigned patients, write prescriptions, access patient records, and update their profile.

- **Admin:**  
  Can manage all doctors and patients, oversee appointments, and update admin profile/settings.

---

## API Endpoints

All endpoints use JSON. Below are key endpoints (see full API spec for details):

### Patient

- `GET /api/patient/appointments`  
  Returns list of patient's appointments.
- `POST /api/patient/appointments`  
  Book a new appointment.
- `GET /api/patient/prescriptions`  
  Returns list of prescriptions.
- `GET /api/patient/records`  
  Returns medical records.
- `GET /api/patient/profile`  
  Returns profile info.
- `PUT /api/patient/profile`  
  Update profile.

### Doctor

- `GET /api/doctor/appointments`  
  Returns doctor's appointments.
- `POST /api/doctor/appointments/update-status`  
  Update appointment status.
- `GET /api/doctor/patients`  
  List assigned patients.
- `GET /api/doctor/patients/{id}`  
  Patient details.
- `GET /api/doctor/prescriptions`  
  List prescriptions.
- `POST /api/doctor/prescriptions`  
  Create prescription.
- `GET /api/doctor/patients/{id}/records`  
  Patient records.
- `POST /api/doctor/patients/{id}/records`  
  Add record.
- `GET /api/doctor/profile`  
  Profile info.
- `PUT /api/doctor/profile`  
  Update profile.

### Admin

- `GET /api/admin/doctors`  
  List all doctors.
- `POST /api/admin/doctors`  
  Add doctor.
- `PUT /api/admin/doctors/{id}`  
  Update doctor.
- `DELETE /api/admin/doctors/{id}`  
  Remove doctor.
- `GET /api/admin/patients`  
  List all patients.
- `POST /api/admin/patients`  
  Add patient.
- `PUT /api/admin/patients/{id}`  
  Update patient.
- `DELETE /api/admin/patients/{id}`  
  Remove patient.
- `GET /api/admin/appointments`  
  List all appointments.
- `POST /api/admin/appointments/update-status`  
  Update appointment status.
- `GET /api/admin/profile`  
  Admin profile.
- `PUT /api/admin/profile`  
  Update profile.

---

## Setup & Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```

3. **Build for production:**
   ```bash
   pnpm build
   ```

4. **Lint code:**
   ```bash
   pnpm lint
   ```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**ClinicHub Frontend**  
Built with ❤️ using React, Tailwind, TypeScript, and Vite.
