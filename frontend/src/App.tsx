import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/loginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DesktopPage from "./components/desktopPage/DesktopPage";
import MainLayout from "./mainLayout/MainLayout";
import WorkersPage from "./components/workersPage/WorkersPage";
import ClientsPage from "./components/clientsPage/ClientsPage";
import RepairsPage from "./components/repairsPage/RepairsPage";
import CarsPage from "./components/carsPage/CarsPage";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/desktop" element={<DesktopPage/>}/>
                    <Route path="/workers" element={<WorkersPage/>}/>
                    <Route path="/warehouse" element={<WorkersPage/>}/>
                    <Route path="/clients" element={<ClientsPage/>}/>
                    <Route path="/repairs" element={<RepairsPage/>}/>
                    <Route path="/cars" element={<CarsPage/>}/>
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
