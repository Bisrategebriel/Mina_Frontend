import React from "react";
import step1 from "../images/step1.png";
import step2 from "../images/step2.png";
import step3 from "../images/step3.png";
import step4 from "../images/step4.png";
import step5 from "../images/step5.png";

function HowToRegister(props) {
	return (
		<div id="howToRegister">
			<div className="w-screen my-24">
				<h1 className="text-5xl mb-12">How does Mina play work?</h1>

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
							Step
							<br />
							01
						</div>
						<h1 className="text-2xl font-bold">Open Mina Play</h1>
						<p className="text-xl text-justify">
							Log in to the website, check out the home page, and you will find an icon
							for registration. Then click the register button on the home page.
						</p>
					</div>
				</div>

				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
							Step
							<br />
							02
						</div>
						<h1 className="text-2xl font-bold">Create an Account</h1>
						<p className="text-xl text-justify">
							Complete the personal information in the Sign-up form. Create a password
							and get confirmed. Then click the next button.
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
							Step
							<br />
							03
						</div>
						<h1 className="text-2xl font-bold">Pay Registration Fee</h1>
						<p className="text-xl text-justify">
							Select and transfer or pay the registration fee via the listed money
							transferring methods. Then click confirm the payment button.
						</p>
					</div>
				</div>
				<div className="w-full grid grid-cols-12 px-6 md:px-12 lg:px-36 xl:px-48  my-8 md:my-2">
					<div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center px-12 space-y-4">
						<div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-mina-orange-light text-white bg-mina-blue-dark">
							Step
							<br />
							04
						</div>
						<h1 className="text-2xl font-bold">Confirm Payment</h1>
						<p className="text-xl text-justify">
                        Fill in the requested questions and confirm your payment. 
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
							Step
							<br />
							05
						</div>
						<h1 className="text-2xl font-bold">You're Done</h1>
						<p className="text-xl text-justify">
							Now you can Sign-in to mina play. Get instant access to work from your comfort and earn money.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowToRegister;
