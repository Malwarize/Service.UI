import {FetchConfig, EditConfig} from "../../wailsjs/go/main/App";
import {Config} from "../shared/Types";
import React, {useEffect, useState} from "react";

interface props {
    showErrorMessage: any;
}

export default function SettingsForm(props : props) {
    const [formValues, setFormValues] = useState({
        db_file_path: "",
        services_path: "",
    });

    useEffect(() => {
        FetchConfig()
            .then((jsonString) => {
                const parsedConfig = JSON.parse(jsonString);
                console.log("Fetching config");
                console.log(parsedConfig);
                if (parsedConfig?.Error) {
                    props.showErrorMessage(parsedConfig.Error);
                }
                setFormValues({
                    db_file_path: parsedConfig.db_file_path,
                    services_path: parsedConfig.services_path,
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const handleSave = (event: any) => {
        event.preventDefault();

        const { db_file_path, services_path } = formValues;

        EditConfig(db_file_path, services_path)
            .then((jsonString) => {
                const parsedConfig = JSON.parse(jsonString);
                if (parsedConfig?.Error) {
                    props.showErrorMessage(parsedConfig.Error);
                }

            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="h-[calc(100vh-10rem)] overflow-y-scroll overflow-visible">
                <h1 className="text-2xl font-bold text-deep-gray">Settings</h1>
                <form className={"mx-10"}>
                    <div className="grid grid-cols-2 gap-2 w-full mt-10">
                        <label
                            htmlFor="DbFilePath"
                            className="text-sm font-bold text-gray-500"
                        >
                            Database File
                        </label>
                        <input
                            type="text"
                            name="db_file_path"
                            id="DbFilePath"
                            onChange={handleInputChange}
                            value={formValues.db_file_path}
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                        />

                        <label htmlFor="services location" className="text-sm font-bold text-gray-500">
                            Services
                        </label>
                        <input
                            type="text"
                            name="services_path"
                            id="services_path"
                            value={formValues.services_path}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                        />
                        <div></div>
                        <button
                            className="w-full p-2 mt-4 bg-primary-purple rounded shadow text-gray-100 hover:bg-purple-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </form>
        </div>
                )
}