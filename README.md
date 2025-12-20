# Poli Healthcare Management System - User Flow

## 1. User Flow (Patient Interaction)

### Landing Page (Home)
- **Options**:  
  - Log in  
  - Register  

- **Overview**: A brief introduction to the system and its features.  

- **Action**: Patient chooses to either log in or register.

---

### 2. Log In / Register

- **Log In**:  
  - Enter credentials (email and password).  

- **Register**:  
  - Create a new account by providing personal information (name, email, password, etc.).

---

### 3. Dashboard (Post-login)
- **Navigation**:  
  - **Appointments**  
  - **Health Records**  
  - **Prescriptions**  
  - **Billing**  
  - **Profile**

- **Actions**:  
  - View upcoming appointments  
  - View or request medical records  
  - Make new appointments with doctors

---

## 4. Appointment Booking Flow

### 4.1 Select Doctor
- **Option**:  
  - Filter by specialization, availability, and location.

### 4.2 Choose Time Slot
- **Action**:  
  - Patient picks an available time for consultation.

### 4.3 Confirm Appointment
- **Action**:  
  - Confirm appointment details and request booking.

### 4.4 Confirmation Page
- **Action**:  
  - Patient receives a confirmation message and calendar sync option.

---

## 5. Doctor's Interaction Flow

### 5.1 Log In
- **Action**:  
  - Doctors log into their dashboard using credentials.

### 5.2 Dashboard (Doctor)
- **Options**:  
  - **Patient List**  
  - **Appointments**  
  - **Prescriptions**  
  - **Health Records**

- **Action**:  
  - View and manage patient appointments, prescriptions, and health records.

### 5.3 Appointment Management
- **Action**:  
  - Accept/Reject/Reschedule appointments with patients.

### 5.4 Prescriptions
- **Action**:  
  - Create or update prescriptions, view patient history.

---

## 6. Backend Flow
----
### Full flow
#### 1. [Backend](/Backend/README.md)
#### - [Swagger documentation](https://clinichub-backend-0en7.onrender.com/docs)
#### 2. [Frontend](/Frontend/README.md)
----
### 6.1 Authentication and Authorization
- **Login/Signup**:  
  - Handle user authentication via JWT tokens.

- **Admin**:  
  - Admin can manage users (patients, doctors), oversee appointments, etc.

### 6.2 Database
- **PostgreSQL**:  
  - Store data such as patient records, appointment schedules, prescriptions, and billing info.

### 6.3 Appointment Management
- **Endpoints**:  
  - CRUD operations for creating, updating, viewing, and deleting appointments.

- **Appointments Table**:  
  - Contains patient details, appointment time, doctor info, and status (pending, confirmed, etc.).

### 6.4 Prescriptions Management
- **Endpoints**:  
  - CRUD operations for creating, viewing, and updating prescriptions.

- **Prescriptions Table**:  
  - Contains details like medication, dosage, and doctor's notes.

---

## 7. API Flow Example

### 7.1 Patient Requests to View Appointments
- **Endpoint**:  
  - `GET /api/appointment

---
### It's recomended to watch them on the order they are listed
## 8. System recordings
### 1. [System adminstrator](https://drive.google.com/file/d/14IbUslDwMTQXgwG6LN_QXAMmRgAtSokU/view?usp=sharing)
### 2. [Patient panel](https://drive.google.com/file/d/1Em8fTjNjYgU2HW88TM_KeUsTvQ-D6NrR/view?usp=sharing)
### 3. [Doctor panel](https://drive.google.com/file/d/14IbUslDwMTQXgwG6LN_QXAMmRgAtSokU/view?usp=sharing)

Whole file is dedicacated only to [nexventures@gmail.com](nexventures@gmail.com)
## [Limk](https://drive.google.com/drive/folders/1UGphf2F8H4IRziE-9-z4Ant8B_EN3Fj0?usp=sharing)