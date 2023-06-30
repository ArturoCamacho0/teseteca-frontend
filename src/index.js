import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import store from './store';

import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProjectsPage from "./pages/Projects";
import AddProjectPage from './pages/Projects/NewProject';
import CustomerPage from './pages/Customer';
import AddCustomerPage from './pages/Customer/NewCustomer';

import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/new" element={<AddProjectPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/customers/new" element={<AddCustomerPage />} />
      </Routes>
      <AppFooter />
    </BrowserRouter>
  </Provider>
);
