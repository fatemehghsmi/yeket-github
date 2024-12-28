import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetail from "./Pages/ProductDetail";
import BestSellers from "./Pages/BestSellers";
import Newests from "./Pages/Newests";
import AboutYeket from "./pages/AboutYeket";
import ContactYeket from "./pages/ContactYeket";
import ContactSupportYeket from "./pages/ContactSupportYeket";
import AnswersQuestions from "./pages/AnswersQuestions";
import HowToSell from "./pages/HowToSell";
import HowToBuy from "./pages/HowToBuy";
import ContactSalesSupport from "./pages/ContactSalesSupport";
import PaymentGuide from "./pages/PaymentGuide";
import PurchaseConditions from "./pages/PurchaseConditions";
import Returning from "./pages/Returning";
import SendOrder from "./pages/SendOrder";
import TermsOfSale from "./pages/TermsOfSale";
import ReaportInYeket from "./pages/ReaportInYeket";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import VendorProducts from "./Pages/VendorProducts";

import styles from "./App.module.css";
import CategoryPage from "./Pages/CategoryPage";
import SubCategoryPage from "./Pages/SubCategoryPage";

function App() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Routes>
          <Route path="/newests" element={<Newests />} />
          <Route path="/bestsellers" element={<BestSellers />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route
            path="/subcategory/:collectionId"
            element={<SubCategoryPage />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutyeket" element={<AboutYeket />} />
          <Route path="/contactyeket" element={<ContactYeket />} />
          <Route
            path="/contactsalessupport"
            element={<ContactSalesSupport />}
          />
          <Route path="/answersquestions" element={<AnswersQuestions />} />
          <Route
            path="/contactsupportyeket"
            element={<ContactSupportYeket />}
          />
          <Route path="/howtobuy" element={<HowToBuy />} />
          <Route path="/howtosell" element={<HowToSell />} />
          <Route path="/paymentguide" element={<PaymentGuide />} />
          <Route path="/purchaseconditions" element={<PurchaseConditions />} />
          <Route path="/reaportinyeket" element={<ReaportInYeket />} />
          <Route path="/returning" element={<Returning />} />
          <Route path="/sendorder" element={<SendOrder />} />
          <Route path="/termsofsale" element={<TermsOfSale />} />
          <Route path="/vendor/:vendor" element={<VendorProducts />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
