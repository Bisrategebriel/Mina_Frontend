import React from "react";
import { flushSync } from "react-dom";

function FAQ(props) {
  return (
    <div>
      <div className="w-full flex flex-col space-y-4 relative">
        {/* <div className="w-full text-start p-4 border-2 border-gray-200 rounded-lg backdrop-blur-lg "> */}
        {/* </div> */}
        <div className="w-full text-start p-6 border-2 border-gray-200 rounded-lg backdrop-blur-lg">
          <h1 className="text-xl font-semibold my-2">{props.question}</h1>
          <p className="text-md text-justify">{props.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
