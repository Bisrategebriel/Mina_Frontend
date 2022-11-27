import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import cbe from "../images/cbe.png";
import awash from "../images/awash.png";
import dashen from "../images/dashen.png";
import abyssinia from "../images/abyssinia.png";
import "../App.css";

function Signup() {
  return (
    <>
      <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50 bg-mina-blue-dark">
        <Link to="/">
          <img src={logo} alt="mina logo" className="h-16 object-cover" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-12 px-12 md:px-24 lg:px-48 grid-rows-6">
        <div className="col-span-12 xl:col-span-8 xl:col-start-3 row-start-2 row-span-4 p-12 rounded-lg relative">
          <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -top-12 -right-24 rounded-full"></div>
          <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -bottom-12 -left-24 rounded-full"></div>

          <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-md bg-white/10 shadow-lg rounded-lg"></div>

          <div className="grid grid-cols-12 px-6 xl:px-24 relative z-20 gap-4">
            <div className="col-span-12 flex flex-col items-center space-y-4">
              <img className="w-36" src={logo} alt="mina logo" srcSet="" />
              <p className="text-lg">Sign up and start earning</p>
            </div>

            <div className="col-span-12 flex w-full items-center">
              <div className="rounded-full min-h-[48px] min-w-[48px] bg-mina-orange-light flex items-center justify-center">
                <h1 className="text-white text-lg font-bold">1</h1>
              </div>
              <div className="grow h-3 w-full bg-mina-blue-light"></div>
              <div className="rounded-full min-h-[48px] min-w-[48px] bg-mina-blue-dark flex items-center justify-center">
                <h1 className="text-white text-lg font-bold">2</h1>
              </div>
            </div>

            <form className="col-span-12 grid-cols-12 grid gap-4">
              {/* signup form */}
              <div
                id="personalInfo"
                className="col-span-12 grid-cols-12 grid gap-4 hidden"
              >
                <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                  <label className="text-sm text-start" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    className="p-3 bg-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                  <label className="text-sm text-start" htmlFor="first_name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    className="p-3 bg-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                  <label className="text-sm text-start" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="p-3 bg-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                  <label className="text-sm text-start" htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Phone Number"
                    className="p-3 bg-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                  <label className="text-sm text-start" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="p-3 bg-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                  <label
                    className="text-sm text-start"
                    htmlFor="confirm_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    className="p-3 bg-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div className="col-span-12 flex justify-end">
                  <input
                    type="submit"
                    value="Submit"
                    className="bg-mina-blue-light py-2 px-4 text-white rounded-lg"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="col-span-12 grid-cols-12 grid gap-4 hidden">
                <div className="col-span-12 flex justify-between p-8 bg-mina-blue-light text-white rounded-lg">
                  <div className="flex flex-col justify-around h-full items-start">
                    <h1 className="text-xl">Registration Fee</h1>
                    <h1 className="text-3xl font-bold">1000 ETB</h1>
                  </div>
                </div>

                <div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
                  <div className="w-12 h-12 bg-white">
                    <img src={cbe} alt="" srcSet="" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-start text-sm">
                      Commercial Bank of Ethiopia
                    </p>
                    <p className="text-start">
                      {" "}
                      <span className="text-sm font-bold"> Account Name: </span>
                      Mina Entertainment
                    </p>
                    <p className="text-start">
                      <span className="text-sm font-bold">
                        Account Number:{" "}
                      </span>
                      1000123456789
                    </p>
                  </div>
                </div>

                <div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
                  <div className="w-12 h-12 bg-white">
                    <img src={abyssinia} alt="" srcSet="" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-start text-sm">Abyssinia Bank</p>
                    <p className="text-start">
                      {" "}
                      <span className="text-sm font-bold"> Account Name: </span>
                      Mina Entertainment
                    </p>
                    <p className="text-start">
                      <span className="text-sm font-bold">
                        Account Number:{" "}
                      </span>
                      1000123456789
                    </p>
                  </div>
                </div>

                <div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
                  <div className="w-12 h-12 bg-white">
                    <img src={awash} alt="" srcSet="" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-start text-sm">
                      Awash International Bank
                    </p>
                    <p className="text-start">
                      {" "}
                      <span className="text-sm font-bold"> Account Name: </span>
                      Mina Entertainment
                    </p>
                    <p className="text-start">
                      <span className="text-sm font-bold">
                        Account Number:{" "}
                      </span>
                      1000123456789
                    </p>
                  </div>
                </div>

                <div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
                  <div className="w-12 h-12 bg-white">
                    <img src={dashen} alt="" srcSet="" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-start text-sm">Dashen Bank</p>
                    <p className="text-start">
                      {" "}
                      <span className="text-sm font-bold"> Account Name: </span>
                      Mina Entertainment
                    </p>
                    <p className="text-start">
                      <span className="text-sm font-bold">
                        Account Number:{" "}
                      </span>
                      1000123456789
                    </p>
                  </div>
                </div>

                <div className="col-span-12">
                  <button className="bg-mina-orange-light py-2 px-4 text-lg rounded-lg text-white font-bold w-full">
                    Confirm Payment
                  </button>
                </div>
              </div>

              {/* Confirm Payment */}
              <div className="col-span-12 grid gap-4 grid-cols-12">
                <div className="col-span-12 md:col-span-4 flex flex-row md:flex-col items-center justify-around md:justify-center space-x-2 space-y-0 md:space-x-0 md:space-y-4">
                  <div className="">
                    <input
                      type="radio"
                      name="bank"
                      id="cbe"
                      className="hidden peer"
                    />
                    <label
                      className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
                      htmlFor="cbe"
                    >
                      <img src={cbe} alt="" srcSet="" className="w-24 auto" />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="bank"
                      id="abyssinia"
                      className="hidden peer"
                    />
                    <label
                      className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
                      htmlFor="abyssinia"
                    >
                      <img src={abyssinia} alt="" srcSet="" />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="bank"
                      id="awash"
                      className="hidden peer"
                    />
                    <label
                      className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
                      htmlFor="awash"
                    >
                      <img src={awash} alt="" srcSet="" />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="bank"
                      id="dashen"
                      className="hidden peer"
                    />
                    <label
                      className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
                      htmlFor="dashen"
                    >
                      <img src={dashen} alt="" srcSet="" />
                    </label>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-8 grid-cols-12 space-y-4">
                  <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                    <label className="text-sm text-start" htmlFor="first_name">
                      Deposited By
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      placeholder="Full Name"
                      className="p-3 bg-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                    <label
                      className="text-sm text-start"
                      htmlFor="transaction_number"
                    >
                      Transaction Number
                    </label>
                    <input
                      type="text"
                      name="transaction_number"
                      id="transaction_number"
                      placeholder="Transaction Reference Number"
                      className="p-3 bg-gray-200 rounded-lg"
                      required
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                    <label
                      className="text-sm text-start"
                      htmlFor="payment_date"
                    >
                      Deposited At
                    </label>
                    <input
                      type="date"
                      name="payment_date"
                      id="payment_date"
                      placeholder="Payment Date"
                      className="p-3 bg-gray-200 rounded-lg"
                      required
                    />
                  </div>

                  <div className="col-span-12 flex justify-start space-x-2">
                    <input
                      type="checkbox"
                      name="terms_agreement"
                      id="terms_agreement"
                    />
                    <label htmlFor="terms_agreement">
                      <p className="text-start text-xs">
                        By Signing up, you agree to our Terms and Privacy Policy
                      </p>
                    </label>
                  </div>
                  <div className="col-span-12">
                    <button className="bg-mina-orange-light py-2 px-4 text-lg rounded-lg text-white font-bold w-full">
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="col-span-12 flex justify-center">
              Already have an account?{" "}
              <Link className="text-mina-blue-dark font-bold" to="/signin">
                {" "}
                Login{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
