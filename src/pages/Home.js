import Navbar from "../components/Navbar";
// Import Components
import Landing from "../components/Landing";
import GetStarted from "../components/GetStarted";
import About from "../components/About";
import AdBanner from "../components/AdBanner";
import HowToRegister from "../components/HowToRegister";
import FAQs from "../components/FAQs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [ad1, setAd1] = useState();
    const [ad2, setAd2] = useState();

    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.get(`/api/settings`).then((res) => {
                if (res.data.status === 200) {
                    setAd1(res.data.settings.ad1)
                    setAd2(res.data.settings.ad2)
                } 
            });
        });
    }, [])
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

			{/* Banner 1 */}
			<AdBanner banner={axios.defaults.baseURL+"/uploads/ads/"+ad1}></AdBanner>

			{/* How to Register */}
			<HowToRegister></HowToRegister>

			{/* Banner 2 */}
			<AdBanner banner={axios.defaults.baseURL+"/uploads/ads/"+ad2}></AdBanner>

			{/* FAQs */}
			<FAQs></FAQs>

			{/* Contact  */}
			<Contact></Contact>

			{/* Footer */}
			<Footer></Footer>
		</div>
	);
}

export default Home;
