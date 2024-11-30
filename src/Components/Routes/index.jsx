import React, { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
 import HomePage from "../../Pages/Home";
import SignIn from "../../Pages/Signup";
import SignUp from "../../Pages/Login";
import ForgotPassword from "../../Pages/ForgotPassword";
import PrivacyPolicy from "../Privacy";
import AdminFrame from "../AdminFrame";
import { AdminNavItems } from "../AdminNavItems";
import { PatientsNavItems} from '../PatientsNavItems';
import { CaregiverNavItems } from '../CaregiverNavItems'; 
import AdminDashboard from "../../Pages/Admin";
import Error403 from '../403'
 import TotalUsersList from "../../Pages/Admin/Users-list";
import PatientsList from "../../Pages/Admin/Patients-list";
import CareTakersList from "../../Pages/Admin/CareTakers-list";
import ViewPatient from "../../Pages/Admin/Patients-list/ViewPatient";
import CaregiverDetailsPage from "../../Pages/Admin/CareTakers-list/CaregiverDetails";
import AppointmentsPage from "../../Pages/Admin/Appointments";
import ProfilePage from "../../Pages/Profile";
import PatientsPage from "../../Pages/Patient";
import Profile from "../../Pages/Profile";
import ViewPatientProfile from "../../Pages/Admin/Patients-list/ViewPatientProfile";
import PatientsFrame from "../PatientsFrame";
import CaregiverFrame from "../CaregiverFrame";
import PatientAppointmentsPage from "../../Pages/Admin/PatientsAppointments";
import PatientProfilePage from "../../Pages/Admin/PatientProfile";
import CaregiverAppointmentsPage from "../../Pages/Admin/CaregiversAppointments";

export const AppHome = () => {

   return (
    <>
<div >
      <Routes>
        <Route path="/admin" element={<AdminFrame navs={AdminNavItems }/>} >
        <Route path="dashboard" element={<AdminDashboard />} ></Route>
        <Route path="users-list" element={<TotalUsersList />} ></Route>
        <Route path="appointments" element={<AppointmentsPage />} ></Route>
        <Route path="patients" element={<PatientsList />} ></Route>
        <Route path="care-givers" element={<CareTakersList />} ></Route>

        </Route>
        <Route path="/patients" element={<PatientsFrame navs={PatientsNavItems }/>} >
         <Route index element={<PatientsPage />} ></Route> 
         <Route path="user/profile" element={<PatientProfilePage />} ></Route> 

         <Route path="appointments" element={<PatientAppointmentsPage />} ></Route> 
        </Route>
        <Route path="/caregiver" element={<CaregiverFrame navs={CaregiverNavItems }/>} >
         <Route path="appointments" element={<CaregiverAppointmentsPage />} ></Route>
        <Route path="patients" element={<PatientsList />} ></Route>
        <Route path="care-givers" element={<CareTakersList />} ></Route>
        </Route>


         <Route path='/' element={<HomePage />} ></Route>
         <Route path='/user/profile' element={<ProfilePage />} ></Route>
         <Route path='/user/profile/:id' element={<ProfilePage />} ></Route>
         <Route path="/patients/:id" element={<ViewPatient />} />
         <Route path="/caregivers/:id" element={<CaregiverDetailsPage />} />
         <Route path='/error-403' element={<Error403 />} ></Route>
         <Route path='/privacy-policy' element={<PrivacyPolicy />} ></Route>
         <Route path='/login' element={<SignUp />} ></Route>
         <Route path='/register' element={<SignIn />} ></Route>
         <Route path='/forgot-password' element={<ForgotPassword />} ></Route>
         <Route path='/*' element={<Error403 />} />
       </Routes>
      </div>
    </>
  )
}
