import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AuthPage from "./pages/auth";
import CheckoutPage from "./pages/checkout";
import PurchasesPage from "./pages/purchases";
import ShopPage from "./pages/shop";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="min-h-[100vh]">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasesPage />} />
            <Route path="*" element={`No page found`} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
