import React, { Suspense, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { lazyWithDefault } from './utils/helpers';

const Dashboard = lazyWithDefault(() => import('./pages/Dashboard'));
const About = lazyWithDefault(() => import('./pages/About'));
const Contact = lazyWithDefault(() => import('./pages/Contact'));
const Login = lazyWithDefault(() => import('./pages/Login'));
const Register = lazyWithDefault(() => import('./pages/Register'));

const MemoNavbar = memo(Navbar);
const MemoFooter = memo(Footer);

const App: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <MemoNavbar />
    <main className="flex-grow">
      <ErrorBoundary fallback={<div className="p-6 text-center">Oops! Algo salió mal.</div>}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </main>
    <MemoFooter />
  </div>
);

export default App;
