import React, { useContext } from "react";
import phone from "../../images/phone.png";
import register from "../../images/register.png";
import watch from "../../images/watch.png";
import earn from "../../images/earn.png";
import { LanguageContext } from "../..";

function GetStarted(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
  return (
    <div id="getStarted">
      <div className="w-screen grid grid-cols-12 my-10">
        <div className="col-span-12 md:col-span-6 p-10 text-center flex justify-center relative">
          <div className="relative">
            <div className="min-h-[250px] min-w-[200px] w-[200px] h-[250px] rounded-2xl absolute -left-2 top-0 z-0 bg-mina-orange-light" />
            <div className="min-h-[250px] min-w-[200px] w-[200px] h-[250px] rounded-2xl absolute -right-2 bottom-0 z-0 bg-mina-blue-light" />
            <img
              src={phone}
              alt="get started with mina"
              className="object-cover max-h-[800px] z-10 relative"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 p-10 text-center flex-start flex flex-col space-y-12 md:space-y-36 justify-center">
          <div className="flex flex-col">
            <h1 className="text-5xl">{ln.getStarted}</h1>
            <p>{ln.threeSteps}</p>
          </div>

          <div className="flex justify-center -space-x-3">
            <div className="flex flex-col space-y-4 justify-between">
              <div className="rounded-full shadow-lg p-9 bg-white">
                <img src={register} alt="register icon" className="w-32" />
              </div>
              <p className="text-xl">{ln.register}</p>
            </div>
            <div className="flex flex-col space-y-4 justify-between">
              <div className="rounded-full shadow-lg p-9 bg-white">
                <img src={watch} alt="watch icon" className="w-32" />
              </div>
              <p className="text-xl">{ln.watchVideo}</p>
            </div>
            <div className="flex flex-col space-y-4 justify-between">
              <div className="rounded-full shadow-lg p-9 bg-white">
                <img src={earn} alt="earn icon" className="w-32" />
              </div>
              <p className="text-xl">{ln.earn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
