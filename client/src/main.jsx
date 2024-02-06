import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
axios.defaults.baseURL='http://localhost:8080/api/v1';
axios.defaults.withCredentials=true;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position='top-right'/>
    <App />
  </React.StrictMode>,
)
