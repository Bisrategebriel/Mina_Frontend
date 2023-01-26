import React, { useContext } from "react";
import { LanguageContext } from "../..";
import step1 from "../../images/step1.png";
import step2 from "../../images/step2.png";
import step3 from "../../images/step3.png";
import step4 from "../../images/step4.png";
import step5 from "../../images/step5.png";

function HowToRegister(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
	return (
		<div id="howToRegister">
			<div className="w-screen my-24">
				<h1 className="text-5xl mb-12">{ln.howMinaWorks}</h1>

				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48 my-8 md:my-2">
					<div className="col-span-6 md:flex hidden items-center justify-center px-12">
						<img
							src={step1}
							alt="registration step one"
							className="w-100 object-cover"
						/>
					</div>

					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
							{ln.step}
							<br />
							01
						</div>
						<h1 className="text-2xl font-bold">{ln.stepOne}</h1>
						<p className="text-xl text-justify">
                            {ln.stepOneDetail}
						</p>
					</div>
				</div>

				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
                            {ln.step}
							<br />
							02
						</div>
						<h1 className="text-2xl font-bold">{ln.stepTwo}</h1>
						<p className="text-xl text-justify">
                            {ln.stepTwoDetail}
						</p>
					</div>

					<div className="col-span-6 md:flex hidden items-center justify-center px-12">
						<img
							src={step2}
							alt="registration step one"
							className="w-100 object-cover"
						/>
					</div>
				</div>

				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
					<div className="col-span-6 md:flex hidden items-center justify-center px-12">
						<img
							src={step3}
							alt="registration step one"
							className="w-100 object-cover"
						/>
					</div>

					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
                            {ln.step}
							<br />
							03
						</div>
						<h1 className="text-2xl font-bold">{ln.stepThree}</h1>
						<p className="text-xl text-justify">
							{ln.stepThreeDetail}
						</p>
					</div>
				</div>
				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
                            {ln.step}
							<br />
							04
						</div>
						<h1 className="text-2xl font-bold">{ln.stepFour}</h1>
						<p className="text-xl text-justify">
                        {ln.stepFourDetail}
						</p>
					</div>

					<div className="col-span-6 md:flex hidden items-center justify-center px-12">
						<img
							src={step4}
							alt="registration step one"
							className="w-100 object-cover"
						/>
					</div>
				</div>

				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
					<div className="col-span-6 md:flex hidden items-center justify-center px-12">
						<img
							src={step5}
							alt="registration step one"
							className="w-100 object-cover"
						/>
					</div>

					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
                            {ln.step}
							<br />
							05
						</div>
						<h1 className="text-2xl font-bold">{ln.stepFive}</h1>
						<p className="text-xl text-justify">
							{ln.stepFiveDetail}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowToRegister;
