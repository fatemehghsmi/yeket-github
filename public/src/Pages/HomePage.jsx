import React from "react";
import FirstBanner from "../Components/FirstBanner/FirstBanner";
import BestSeller from "../Components/BestSeller/BestSeller";
import About from "../Components/About/About";
import Category from "../Components/Category/Category";
import SecondBanner from "../Components/SecondBanner/SecondBanner";
import Newest from "../Components/Newest/Newest";

function HomePage() {
  return (
    <div>
      <FirstBanner />
      <BestSeller />
      <About />
      <Category />
      <SecondBanner />
      <Newest/>
    </div>
  );
}

export default HomePage;
