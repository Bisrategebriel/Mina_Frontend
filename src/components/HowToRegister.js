import React from 'react';
import step1 from '../images/step1.png';
import step2 from '../images/step2.png';
import step3 from '../images/step3.png';

function HowToRegister(props) {
    return (
        <div>
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
        </div>
    );
}

export default HowToRegister;