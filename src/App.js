import logo from './images/logo.png';
import moviePoster from './images/movie_poster.png';
import phones from './images/phones.png';
import phone from './images/phone.png';
import register from './images/register.png';
import watch from './images/watch.png';
import earn from './images/earn.png';
import adBanner1 from './images/adBanner1.png';
import step1 from './images/step1.png';
import step2 from './images/step2.png';
import step3 from './images/step3.png';
import playstore from './images/playstore.png'
import appstore from './images/appstore.png'

import './App.css';

function App() {
  return (
    <div className="App relative font-comfortaa">

      {/* Navbar */}
      <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50">
        <img src={logo} alt="mina logo" className="h-16 object-cover"/>
        
        <div className=" font-comfortaa space-x-3">
          <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">Login</button>
          <button className="p-2 px-4 bg-white rounded-lg hover:bg-mina-orange-light hover:text-white text-mina-blue-dark font-bold">Register</button>
        </div>
      </div>

      {/* Landing */}
      <div className="w-screen max-h-[880px] relative overflow-hidden z-0">
        <img src={moviePoster} alt="landing page" className="w-100 min-h-[800px] object-cover"/>
        <div className="absolute bg-gradient-to-b from-mina-blue-dark to-mina-blue-light/80 top-0 right-0 left-0 bottom-0 grid grid-cols-12 md:px-24">

          <div className="flex flex-col items-center md:items-start justify-center p-12 col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-7">
            <h1 className="text-5xl md:text-7xl text-center md:text-start text-white mb-16 md:mb-36 font-bold">
              WATCH VIDEOS AND EARN MONEY
            </h1>

            <p className="font-semibold text-mina-orange-light text-xl md:text-2xl my-3 text-center md:text-start">Discover fun at your fingertips. Ready to watch?</p>
            <div className="flex space-x-4">
              <button className="p-2 px-4 hover:bg-white rounded-lg bg-mina-orange-light hover:text-orange-500 text-mina-blue-dark font-bold">Get Started</button>
              <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-white  text-mina-orange-light font-bold rounded-lg">Download the App</button>

            </div>

          </div>
          <div className="hidden lg:flex items-center justify-start col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-5 p-6">
            <img src={phones} alt="" className="max-w-full max-h-full object-cover"/>

          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="w-screen grid grid-cols-12 my-10">
        <div className="col-span-12 md:col-span-6 p-10 text-center flex justify-center relative">
          <div className='relative'>
            <div className="min-h-[250px] min-w-[200px] w-[200px] h-[250px] rounded-2xl absolute -left-2 top-0 z-0 bg-mina-orange-light" />
            <div className="min-h-[250px] min-w-[200px] w-[200px] h-[250px] rounded-2xl absolute -right-2 bottom-0 z-0 bg-mina-blue-light" />
            <img src={phone} alt="get started with mina" className="object-cover max-h-[800px] z-10 relative"/>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 p-10 text-center flex-start flex flex-col space-y-12 md:space-y-36 justify-center">
          
          <div className="flex flex-col">
            <h1 className="text-5xl">Get Started</h1>
            <p>Three simple steps to get started.</p>
          </div>
          
          <div className="flex justify-center -space-x-3">
            <div className="flex flex-col space-y-4 justify-between">
              <div className="rounded-full shadow-lg p-9 bg-white">
                <img src={register} alt="register icon" className="w-32"/>
              </div>
              <p className="text-xl">Register</p>
            </div>
            <div className="flex flex-col space-y-4 justify-between">
              <div className="rounded-full shadow-lg p-9 bg-white">
                <img src={watch} alt="watch icon" className="w-32"/>
              </div>
              <p className="text-xl">Watch Video</p>
            </div>
            <div className="flex flex-col space-y-4 justify-between">
              <div className="rounded-full shadow-lg p-9 bg-white">
                <img src={earn} alt="earn icon" className="w-32"/>
              </div>
              <p className="text-xl">Earn</p>
            </div>
          </div>
        </div>

      </div>


      {/* Banner 1 */}
      <div className="w-screen my-24">
        <img src={adBanner1} alt="ad banner one" className="min-h-[300px] object-cover object-left"/>
      </div>

      {/* How to Register */}
      <div className="w-screen my-24">
        <h1 className="text-5xl mb-12">How to Register</h1>

        <div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48 my-8 md:my-2">
          <div className="col-span-6 md:flex hidden items-center justify-center px-12">
            <img src={step1} alt="registration step one" className="w-100 object-cover"/>
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
              Step<br/>01
            </div>
            <h1 className="text-2xl font-bold">Register into the system</h1>
            <p className="text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum has been the industry's standard dummy when an unknown printer took a galley of type and specimen book. It has survived not only five centuries,</p>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
          <div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
              Step<br/>02
            </div>
            <h1 className="text-2xl font-bold">Pay through mobile banking</h1>
            <p className="text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum has been the industry's standard dummy when an unknown printer took a galley of type and specimen book. It has survived not only five centuries,</p>
          </div>

          <div className="col-span-6 md:flex hidden items-center justify-center px-12">
            <img src={step2} alt="registration step one" className="w-100 object-cover"/>
          </div>
        </div>

        <div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
          <div className="col-span-6 md:flex hidden items-center justify-center px-12">
            <img src={step3} alt="registration step one" className="w-100 object-cover"/>
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
              Step<br/>03
            </div>
            <h1 className="text-2xl font-bold">Confirm Payment and Enjoy</h1>
            <p className="text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum has been the industry's standard dummy when an unknown printer took a galley of type and specimen book. It has survived not only five centuries,</p>
          </div>
        </div>
        
      </div>

      {/* Banner 1 */}
      <div className="w-screen my-24">
        <img src={adBanner1} alt="ad banner one" className="min-h-[300px] object-cover object-left"/>
      </div>

      {/* FAQs */}
      <div className="w-full md:px-12 lg:px-36 xl:px-48  my-12 ">
        <h1 className="text-5xl text-center my-12">Frequently Asked Questions</h1>

        <div className="w-full flex flex-col space-y-4 relative">
            <div className="w-[200px] h-[200px] bg-mina-blue-light absolute -top-12 -left-24 rounded-full"></div>
            <div className="w-[300px] h-[300px] bg-mina-orange-light absolute -bottom-12 -right-24 rounded-full"></div>
            
            {/* Single FAQ */}
            <div className="w-full flex flex-col space-y-4 relative">
              <div className="w-full text-start p-4 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
                <h1 className="text-2xl">What is Mina?</h1>
              </div>
              <div className="w-full text-start p-8 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
                <p className="text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised .
                </p>
              </div>
            </div>
            {/* End of Single FAQ */}

            <div className="w-full flex flex-col space-y-4 relative">
              <div className="w-full text-start p-4 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
                <h1 className="text-2xl">How to register on Mina?</h1>
              </div>
              <div className="w-full text-start p-8 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
                <p className="text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised .
                </p>
              </div>
            </div>
            
            <div className="w-full flex flex-col space-y-4 relative">
              <div className="w-full text-start p-4 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
                <h1 className="text-2xl">How to get Paid on Mina?</h1>
              </div>
              <div className="w-full text-start p-8 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
                <p className="text-xl text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised .
                </p>
              </div>
            </div>

        </div>

      </div>

      {/* Contact  */}
      <div className="w-full text-center my-24 px-12 xl:px-48">
        <h1 className="text-5xl mb-12">Contact Us</h1>

        <form>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
              <label className="text-sm text-start" htmlFor="full_name">Full Name</label>
              <input type="text" name="full_name" id="full_name" placeholder="Full Name" className="p-4 bg-gray-200 rounded-lg" />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
              <label className="text-sm text-start" htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" className="p-4 bg-gray-200 rounded-lg" />
            </div>
            
            <div className="col-span-12 flex flex-col space-y-2 justify-start">
              <label className="text-sm text-start" htmlFor="message">Message</label>
              <textarea name="message" id="message" placeholder="Your Message" className="p-4 bg-gray-200 rounded-lg" />
            </div>
            
            <div className="col-span-12 flex space-y-2 justify-end">
              <input type="submit" value="Submit" className="bg-mina-blue-dark text-white text-lg p-4 px-8 rounded-lg"/>
            </div>


            
          </div>
        </form>
      
        {/* Map */}
        <iframe title="map" className="w-full h-[500px] h-max-[500px] border-0 my-5" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63048.83754591408!2d38.70171053355015!3d9.013272616275021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b8bc10a8f9%3A0xec6b9ab54ab50cb6!2z4YiD4YqT4YqVIOGKrCDhjZXhiIvhi5sgSEFOQU4gSyBQTEFaQQ!5e0!3m2!1sen!2sus!4v1669382784200!5m2!1sen!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      {/* Footer */}
      <div className="w-screen p-12 bg-mina-blue-dark">
        <div className="grid grid-cols-12">

          <div className="col-span-6 md:col-span-12 flex md:flex-row flex-col items-start md:justify-center space-y-4 md:space-y-0 md:space-x-4 text-white text-xl">
            <a href="#">Get Started</a>
            <a href="#">How to Register</a>
            <a href="#">Contact</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>

          <div className="col-span-6 md:col-span-12 flex flex-col md:flex-row justify-center gap-4 my-8">
            <img src={playstore} alt="playstore icon" srcset="" className="h-[50px] object-contain "/>
            <img src={appstore} alt="playstore icon" srcset="" className="h-[50px] object-contain"/>
          </div>

          <div className="col-span-12 flex justify-around text-white mt-12">
            <p>Mina Plays © 2022 All rights reserved</p>
            <a href="www.kuraztech.com">Powered by Kuraz Technologies</a>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
