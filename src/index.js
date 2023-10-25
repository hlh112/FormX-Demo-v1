import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { initializeIcons } from '@fluentui/font-icons-mdl2';

import App from './App';
import Extractors from './routes/extractors';
import Workspaces from './routes/workspaces';
import Extractor from './routes/extractor';
import Onboarding from './routes/onboarding';
import Login from './routes/login';
import OnboardingTest from './routes/onboarding-test';
import OnboardingCustom from './routes/onboarding-custom';
import CreateExtractor from './routes/create-extractor';


const root = ReactDOM.createRoot(document.getElementById('root'));

initializeIcons();

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding-test" element={<OnboardingTest />} />
        <Route path="/create-extractor" element={<CreateExtractor />} />
        <Route path="/onboarding-custom" element={<OnboardingCustom />} />
        <Route path="/extractors" element={<Extractors />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/extractors/extractor" element={<Extractor />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
