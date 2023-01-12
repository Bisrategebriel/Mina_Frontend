import React, { useCallback, useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClose, faMinusCircle, faTimesCircle, faUserPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Settings(props) {
    let [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false)
    }, [])

    const [settingsInput, setSettingsInput] = useState({
        is_signup_active: "",
        point_value: "",
        bank1: "",
        bank2: "",
        bank3: "",
        bank4: "",
        registration_fee: "",
        ad1: "",
        ad2: "",
        error_list: [{ confirm_password: "Passwords do not match" }],
    });

    const handleSettingsInput = (e) => {
        e.persist();
        setSettingsInput({ ...settingsInput, [e.target.name]: e.target.value });
    };

    const settingsSubmit = (e) => {
        e.preventDefault();

        setSettingsInput({
            ...settingsInput,
            error_list: []
        })

        // console.log(settingsInput.ad1)
        const data = {
            is_signup_active: settingsInput.is_signup_active,
            point_value: settingsInput.point_value,
            bank1: settingsInput.bank1,
            bank2: settingsInput.bank2,
            bank3: settingsInput.bank3,
            bank4: settingsInput.bank4,
            registration_fee: settingsInput.registration_fee,
            // ad1: settingsInput.ad1,
            // ad2: settingsInput.ad2,
        };

        let formData = new FormData();
        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        // formData.append(data)
        document.getElementById("ad1").files[0] && formData.append('ad1', document.getElementById("ad1").files[0]);
        document.getElementById("ad2").files[0] && formData.append('ad2', document.getElementById("ad2").files[0]);
        // console.log(formData)


        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`/api/settings`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            }).then((res) => {
                console.log(res.data.message);
                if (res.data.status === 200) {
                    swal.fire("Success", res.data.message, "success");
                    // navigate("/signin");
                } else {
                    setSettingsInput({ ...settingsInput, error_list: res.data.errors });
                }
            });
        });
    };
    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.get(`/api/settings`).then((res) => {
                console.log(res.data.settings.registration_fee);
                if (res.data.status === 200) {
                    setSettingsInput({
                        ...settingsInput,
                        is_signup_active: res.data.settings.is_signup_active,
                        point_value: res.data.settings.point_value,
                        bank1: res.data.settings.bank1,
                        bank2: res.data.settings.bank2,
                        bank3: res.data.settings.bank3,
                        bank4: res.data.settings.bank4,
                        registration_fee: res.data.settings.registration_fee,
                        ad1: res.data.settings.ad1,
                        ad2: res.data.settings.ad2,
                    })
                    // setIsSignupActive(res.data.settings.is_signup_active)
                } else {

                }
            });
        });
    }, [])
    return (
        <div className="h-full w-full flex flex-col gap-2 max-w-screen overflow-x-auto">

            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="blob"></div>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-12 grid-flow-row auto-rows-max">
                    <div className="col-span-12 flex justify-center h-fit">
                        <p className="text-3xl">Settings</p>
                    </div>
                    <form className="col-span-12 text-start h-fit grid grid-cols-12 p-3 gap-4" onSubmit={settingsSubmit} encType="multipart/form-data">
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="is_signup_active">
                                Enable/Disable Signup
                            </label>
                            <select
                                onChange={handleSettingsInput}
                                name="is_signup_active"
                                id="is_signup_active"
                                value={settingsInput.is_signup_active}
                                className="p-3 bg-gray-200 rounded-lg"
                            >
                                <option value="1">
                                    Enabled
                                </option>
                                <option value="0">
                                    Disabled
                                </option>
                            </select>
                            {/* <input
                                type="text"
                                name="is_signup_active"
                                id="is_signup_active"
                                placeholder="Enable/Disable Signup"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.is_signup_active}
                                required
                            /> */}
                            <span className="text-red-500 text-sm">{settingsInput.error_list.is_signup_active}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="point_value">
                                Point Value
                            </label>
                            <input
                                type="text"
                                name="point_value"
                                id="point_value"
                                placeholder="1 Point is equal to ? Birr"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.point_value}
                                required
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.point_value}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="bank1">
                                Bank 1 account
                            </label>
                            <input
                                type="text"
                                name="bank1"
                                id="bank1"
                                placeholder="Bank 1 Account Number"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.bank1}
                                required
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.bank1}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="bank2">
                                Bank 2 account
                            </label>
                            <input
                                type="text"
                                name="bank2"
                                id="bank2"
                                placeholder="Bank 2 Account Number"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.bank2}
                                required
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.bank2}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="bank3">
                                Bank 3 account
                            </label>
                            <input
                                type="text"
                                name="bank3"
                                id="bank3"
                                placeholder="Bank 3 Account Number"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.bank3}
                                required
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.bank3}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="bank4">
                                Bank 4 account
                            </label>
                            <input
                                type="text"
                                name="bank4"
                                id="bank4"
                                placeholder="Bank 4 Account Number"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.bank4}
                                required
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.bank4}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="registration_fee">
                                Registration Fee
                            </label>
                            <input
                                type="text"
                                name="registration_fee"
                                id="registration_fee"
                                placeholder="Registration Fee"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.registration_fee}
                                required
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.registration_fee}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="ad1">
                                Advertisement Banner 1
                            </label>
                            <input type="file" name="ad1" id="ad1"
                                className="p-3 bg-gray-200 rounded-lg"
                                // onChange={handleSettingsInput}
                                // value={settingsInput.ad1}
                            />
                            {/* <input
                                type="text"
                                name="ad1"
                                id="ad1"
                                placeholder="Advertisement Banner 1"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleSettingsInput}
                                value={settingsInput.bank4}
                                required
                            /> */}
                            <span className="text-red-500 text-sm">{settingsInput.error_list.ad1}</span>
                        </div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="ad2">
                                Advertisement Banner 2
                            </label>
                            <input type="file" name="ad2" id="ad2"
                                className="p-3 bg-gray-200 rounded-lg"
                                // onChange={handleSettingsInput}
                                // value={settingsInput.ad2}
                            />
                            <span className="text-red-500 text-sm">{settingsInput.error_list.ad2}</span>
                        </div>
                        <div className="col-span-12 flex justify-end">
                            <input
                                type="submit"
                                value="Submit"
                                className="bg-mina-blue-light cursor-pointer hover:bg-mina-blue-dark py-2 px-4 text-white rounded-lg"
                            />
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}

export default Settings;
