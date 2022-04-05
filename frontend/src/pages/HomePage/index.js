import React, { useState, useContext } from "react";
import NavigationBar from "../NavigationBar/Navbar";
import { AppContext } from "../../context/userContext";
import ImageSection from "./components/ImageSection";
import FoodHomePage from "./components/FoodHomePage";
import Footer from "../Footer/Footer";

const HomePage = () => {
  const {
    state: { authenticated, currentUser, userId, authToken },
  } = useContext(AppContext);
  console.log("Home:" + authenticated)
  return (
    <>
      <NavigationBar />
      <ImageSection />
      <FoodHomePage />
      <Footer />
    </>
  );
};

export default HomePage;
