import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetail from "./Pages/ProductDetail";
import BestSellers from "./Pages/BestSellers";
import Newests from "./Pages/Newests";
import AboutYeket from "./Pages/AboutYeket";
import ContactYeket from "./Pages/ContactYeket";
import ContactSupportYeket from "./Pages/ContactSupportYeket";
import AnswersQuestions from "./Pages/AnswersQuestions";
import HowToSell from "./Pages/HowToSell";
import HowToBuy from "./Pages/HowToBuy";
import ContactSalesSupport from "./Pages/ContactSalesSupport";
import PaymentGuide from "./Pages/PaymentGuide";
import PurchaseConditions from "./Pages/PurchaseConditions";
import Returning from "./Pages/Returning";
import SendOrder from "./Pages/SendOrder";
import TermsOfSale from "./Pages/TermsOfSale";
import ReaportInYeket from "./Pages/ReaportInYeket";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import VendorProducts from "./Pages/VendorProducts";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop"; // مسیر فایل ScrollToTop

import styles from "./App.module.css";
import CategoryPage from "./Pages/CategoryPage";
import SubCategoryPage from "./Pages/SubCategoryPage";

function App() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <ScrollToTop />
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
