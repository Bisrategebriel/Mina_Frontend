import Navbar from "../components/Navbar";
// Import Components
import Landing from "../components/Landing";
import GetStarted from "../components/GetStarted";
import AdBanner from "../components/AdBanner";
import HowToRegister from "../components/HowToRegister";
import FAQs from "../components/FAQs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
	return (
		<div>
			{/* Navbar */}
			<Navbar></Navbar>

			{/* Landing */}
			<Landing></Landing>

			{/* Get Started */}
			<GetStarted></GetStarted>

			{/* Banner 1 */}
			<AdBanner></AdBanner>

			{/* How to Register */}
			<HowToRegister></HowToRegister>

			{/* Banner 2 */}
			<AdBanner></AdBanner>

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
