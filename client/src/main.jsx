import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { persistor, store } from './redux/store.js'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.baseURL='http://localhost:8080/api/v1';
axios.defaults.withCredentials=true;
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>

  <React.StrictMode>
    <Toaster position='top-right'/>
    <App />
  </React.StrictMode>,
</PersistGate>
  </Provider>
)
