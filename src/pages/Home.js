import Navbar from "../components/Navbar";
// Import Components
import Landing from "../components/landing/Landing";
import GetStarted from "../components/landing/GetStarted";
import About from "../components/landing/About";
import AdBanner from "../components/landing/AdBanner";
import HowToRegister from "../components/landing/HowToRegister";
import FAQs from "../components/landing/FAQs";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";
import axios from "axios";
import { useSettings } from "../hooks/utilityHooks";
import { useState } from "react";
import SupportUs from "../components/landing/SupportUs";

function Home() {
    const [ad1, setAd1] = useState();
    const [ad2, setAd2] = useState();

    //Run after successfully fetching Advertisements
    const onSuccess = (data) => {
        setAd1(data?.data.settings.ad1)
        setAd2(data?.data.settings.ad2)
    }
    
    const { isFetched, data } = useSettings(onSuccess);
	
    return (
		<div>
			{/* Navbar */}
			<Navbar></Navbar>

			{/* Landing */}
			<Landing></Landing>

			{/* Get Started */}
			<GetStarted></GetStarted>
			
            {/* About */}
			<About></About>

            {/* Support Us */}
			<SupportUs></SupportUs>

			{/* Banner 1 */}
            {
                isFetched &&
                <AdBanner banner={axios.defaults.baseURL+"/public/uploads/ads/"+ad1}></AdBanner>
            }

			{/* How to Register */}
			<HowToRegister></HowToRegister>

			{/* Banner 2 */}
            {
                isFetched &&
                <AdBanner banner={axios.defaults.baseURL+"/public/uploads/ads/"+ad2}></AdBanner>
            }

			{/* FAQs */}
			<FAQs></FAQs>

			{/* Contact  */}
			{/* <Contact></Contact> */}

			{/* Footer */}
			<Footer></Footer>
		</div>
	);
}

export default Home;
