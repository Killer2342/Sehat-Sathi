# SehatSaathi - Your Smart Healthcare Booking Companion

SehatSaathi is a professional AI-powered doctor appointment booking platform specifically designed for **Bannu and Peshawar, Pakistan**. This version is client-ready and fully integrated with **Supabase** for database, authentication, and storage.

## 🚀 Key Features

- **Real Authentication**: Role-based access control for Patients, Doctors, and Admins via Supabase Auth.
- **Dynamic Database**: Live data for doctors, appointments, cities, and specialties.
- **Image Uploads**: Profile and clinic images stored in Supabase Storage.
- **Doctor Approval Flow**: Doctors require admin verification before appearing publicly.
- **Real Booking System**: Patients can select real time slots and book appointments.
- **AI Symptom Assistant**: Rule-based assistant ready for OpenAI API integration.
- **Role-Based Dashboards**:
  - **Patient**: Manage bookings and health profile.
  - **Doctor**: Manage availability and appointment requests.
  - **Admin**: Approve doctors and monitor platform statistics.

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## ⚙️ Setup Instructions

### 1. Supabase Project Setup
1. Create a new project at [Supabase](https://supabase.com/).
2. Run the SQL script found in `supabase_schema.sql` in the Supabase SQL Editor.
3. Create two public storage buckets: `profiles` and `clinics`.
4. Go to **Project Settings > API** and copy your `URL` and `anon public` key.

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Local Installation
```bash
npm install
npm run dev
```

## 🔐 Demo Accounts
*Note: You must first run the SQL schema and then sign up these users in the app to test.*

- **Admin**: admin@sehatsaathi.com / Admin123
- **Doctor**: doctor@sehatsaathi.com / Doctor123
- **Patient**: patient@sehatsaathi.com / Patient123

## ⚖️ Medical Disclaimer
AI suggestions are for guidance only and are not a medical diagnosis. Always consult a qualified healthcare professional.

---
Built for professional client delivery.
