import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import Products from './Pages/Products';
import Dashboard, { DashboardOverview } from './Dashboard';
import DashboardOrders from './Dashboard/Orders';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import DashboardUsers, { DashboardSubs } from './Dashboard/Users';
import DashboardProducts from './Dashboard/Products';
import { Provider } from 'react-redux';
import { store } from "./store"
import DashboardBlog from './Dashboard/Blog';
import DashboardProfile from './Dashboard/Profile';
import Blogs from './Pages/Blogs';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import DashboardCMS from './Dashboard/CMS';
import Profile from './Pages/Profile';
import TAC from './Pages/TAC';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import { Transaction } from './Pages/Transaction';
import Checkout from './Pages/Checkout';
import { Toaster } from "react-hot-toast"
import DigitalBillboard from './Pages/Products/DigitalBillboard';
import Drape from './Pages/Products/Walldrape';
import Branding from './Pages/Products/Branding';
import Unipole from './Pages/Products/Unipole';
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <BrowserRouter>
          <React.StrictMode>
            <Routes>
              <Route path="/" element={<App />} >
                <Route path="*" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/digital-billboard" element={<DigitalBillboard />} />
                <Route path="/products/drape" element={<Drape />} />
                <Route path="/products/branding" element={<Branding />} />
                <Route path="/products/unipole" element={<Unipole />} />

                <Route path="/terms-and-condition" element={<TAC />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/blog" element={<Blogs />}>
                  <Route path=":category" element={<Blogs />}>
                    <Route path=":title" element={<Blogs />} />
                  </Route>
                </Route>
              </Route>
              <Route path='/transaction' element={<Transaction />} />
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="overview" element={<DashboardOverview />} />
                <Route path='orders' element={<DashboardOrders />} />
                <Route path='users' element={<DashboardUsers />} />
                <Route path='products' element={<DashboardProducts />} />
                <Route path='blogs' element={<DashboardBlog />} />
                <Route path='profile' element={<DashboardProfile />} />
                <Route path='subscribers' element={<DashboardSubs />} />
                <Route path='cms' element={<DashboardCMS />} />
              </Route>
            </Routes>
          </React.StrictMode>
        </BrowserRouter >
      </div>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
