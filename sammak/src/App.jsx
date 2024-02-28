import React, { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load the Home component
const LazyHome = lazy(() => import("../pages/home/home"));
const LazyOrderComplete = lazy(() =>
  import("../component/OrderComplete/OrderComplete")
);
const LazyPaymentComplete = lazy(() =>
  import("../component/PaymentComplete/PaymentComplete")
);
const LazyPaymentFailed = lazy(() =>
  import("../component/Paymentfailed/PaymentFailedPage")
);
const LazyPaymentCanceled = lazy(() =>
  import("../component/PaymentCanceled/PaymentCanceled")
);
const LazyActivated = lazy(() => import("../component/Activated/Activated"));
const LazyTimeout = lazy(() => import("../component/Timeout/Timeout"));
const LazyCheckoutMain = lazy(() => import("../component/Main/CheckoutMain"));
const LazyPassword = lazy(() => import("../component/Forgotpassword/password"));
import Home from "../pages/home/home";
import { Provider } from "./Context/Context";
import Herocart from "../component/herocart/Herocart";
import Viewcart from "../component/Viewcart/Viewcart";
import Checkout from "../component/Checkout/Checkout";
import ResetPassword from "../pages/home/ResetPassword/ResetPassword";
import Shopview from "../component/Shopview/Shopview";
import Aboutview from "../component/Aboutview/Aboutview";
import Contactview from "../component/Contactview/Contactview";
import CheckoutMain from "../component/Main/CheckoutMain";
import toast1, { Toaster } from "react-hot-toast";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <Provider>
        <BrowserRouter>
          <Routes>
            {/* Lazy load the Home component */}
            <Route path="/" element={<Home />} />

            {/* Lazy load the Herocart component */}
            <Route
              path="/shop"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <Herocart />
                </Suspense>
              }
            />

            <Route path="/about" element={<Aboutview />} />
            <Route path="/viewcart" element={<Viewcart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/shopview" element={<Shopview />} />
            <Route path="/contact" element={<Contactview />} />

            {/* Lazy load the OrderComplete component */}
            <Route
              path="/orderComplete"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyOrderComplete />
                </Suspense>
              }
            />

            {/* Lazy load the PaymentComplete component */}
            <Route
              path="/paymentcomplete"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyPaymentComplete />
                </Suspense>
              }
            />

            {/* Lazy load the PaymentFailed component */}
            <Route
              path="/paymentfailed"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyPaymentFailed />
                </Suspense>
              }
            />

            {/* Lazy load the PaymentCanceled component */}
            <Route
              path="/paymentcanceled"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyPaymentCanceled />
                </Suspense>
              }
            />

            {/* Lazy load the Activated component */}
            <Route
              path="/registrationsuccess"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyActivated />
                </Suspense>
              }
            />

            {/* Lazy load the Timeout component */}
            <Route
              path="/timeout"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyTimeout />
                </Suspense>
              }
            />

            {/* Lazy load the CheckoutMain component */}
            <Route path="/setting" element={<CheckoutMain />} />
            {/* Lazy load the Password component */}
            <Route
              path="/forgotpassword"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Render the lazily loaded component */}
                  <LazyPassword />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
