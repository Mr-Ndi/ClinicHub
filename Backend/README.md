# ClinicHub Backend

ClinicHub is a RESTful backend API for a healthcare management platform, designed as a final project for the Nexventure Full Stack Internship. It provides endpoints for Patient, Doctor, and Admin dashboards, supporting appointment management, prescriptions, medical records, and user profiles.

---

## Features
- Patient, Doctor, and Admin dashboards
- Appointment scheduling and management
- Prescription management
- Medical records access
- User profile management
- Role-based API endpoints
- JSON-based RESTful API

---

## API Endpoints

### Patient Dashboard
- `GET /api/patient/appointments` — List patient appointments
- `POST /api/patient/appointments` — Book a new appointment
- `GET /api/patient/prescriptions` — List prescriptions
- `GET /api/patient/records` — List medical records
- `GET /api/patient/profile` — Get patient profile
- `PUT /api/patient/profile` — Update patient profile

### Doctor Dashboard
- `GET /api/doctor/appointments` — List doctor appointments
- `POST /api/doctor/appointments/update-status` — Update appointment status
- `GET /api/doctor/patients` — List patients
- `GET /api/doctor/patients/{id}` — Get patient details
- `GET /api/doctor/prescriptions` — List prescriptions
- `POST /api/doctor/prescriptions` — Create prescription
- `GET /api/doctor/patients/{id}/records` — List patient records
- `POST /api/doctor/patients/{id}/records` — Add patient record
- `GET /api/doctor/profile` — Get doctor profile
- `PUT /api/doctor/profile` — Update doctor profile

### Admin Dashboard
- `GET /api/admin/doctors` — List doctors
- `POST /api/admin/doctors` — Add doctor
- `PUT /api/admin/doctors/{id}` — Update doctor
- `DELETE /api/admin/doctors/{id}` — Remove doctor
- `GET /api/admin/patients` — List patients
- `POST /api/admin/patients` — Add patient
- `PUT /api/admin/patients/{id}` — Update patient
- `DELETE /api/admin/patients/{id}` — Remove patient
- `GET /api/admin/appointments` — List all appointments
- `POST /api/admin/appointments/update-status` — Update appointment status
- `GET /api/admin/profile` — Get admin profile
- `PUT /api/admin/profile` — Update admin profile

---


## Environment & Configuration

- Set the following environment variables as needed:
   - `DATABASE_URL`: Database connection string (default: `sqlite:///./clinichub.db`)
   - `SECRET_KEY`: Secret key for authentication (if using JWT or similar)
   - Other variables as required by your deployment

---

## Authentication

- All endpoints require authentication via JWT tokens (or your chosen method).
- Passwords are securely hashed using Argon2 (see `src/Utils/passwordHasher.py`).
- Admin users have elevated privileges and can manage doctors, patients, and appointments.

---

### Prerequisites
- Python 3.12+
- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- (Recommended) Virtual environment

### Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ClinicHub/Backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv chub
   source chub/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn index:app --reload
   ```

5. (Optional) Seed the initial admin user:
   ```bash
   python scripts/seed_admin.py
   ```

---

## Project Structure
```
Backend/
├── index.py                # Main FastAPI app
├── chub/                   # Virtual environment (if used)
├── scripts/
│   └── seed_admin.py       # Script to seed initial admin user
├── src/
│   ├── Models/
│   ├── Middlewares/
│   ├── Services/
│   └── Utils/
├── ...
```

---

## Testing

To run tests (if available):
```bash
pytest
```
Or use your preferred test runner.

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License
This project is for educational purposes as part of the Nexventure Full Stack Internship.
