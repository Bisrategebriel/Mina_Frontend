import React, { useContext } from "react";
import { LanguageContext } from "../..";

function Contact(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
  return (
    <div id="contact">
      <div className="w-full text-center my-24 px-12 xl:px-48">
        <h1 className="text-5xl mb-12">{ln.contactUs}</h1>

        <form>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
              <label className="text-sm text-start" htmlFor="full_name">
              {ln.fullName}
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder="Full Name"
                className="p-4 bg-gray-200 rounded-lg"
              />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
              <label className="text-sm text-start" htmlFor="email">
              {ln.email}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="p-4 bg-gray-200 rounded-lg"
              />
            </div>

            <div className="col-span-12 flex flex-col space-y-2 justify-start">
              <label className="text-sm text-start" htmlFor="message">
              {ln.message}
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                className="p-4 bg-gray-200 rounded-lg"
              />
            </div>

            <div className="col-span-12 flex space-y-2 justify-end">
              <input
                type="submit"
                value="Submit"
                className="bg-mina-blue-dark text-white text-lg p-4 px-8 rounded-lg"
              />
            </div>
          </div>
        </form>

        {/* Map */}
        <iframe
          title="map"
          className="w-full h-[500px] h-max-[500px] border-0 my-5"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63048.83754591408!2d38.70171053355015!3d9.013272616275021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b8bc10a8f9%3A0xec6b9ab54ab50cb6!2z4YiD4YqT4YqVIOGKrCDhjZXhiIvhi5sgSEFOQU4gSyBQTEFaQQ!5e0!3m2!1sen!2sus!4v1669382784200!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
