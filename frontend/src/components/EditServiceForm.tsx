import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FetchServices,
    FetchServiceGroup,
    FetchServiceFile,
    EditService,
    DeleteService,
} from "../../wailsjs/go/main/App";
import { Groups, ServiceInfo } from "../shared/Types";
import {
    restartOptions,
    types,
    wantedByOptions,
} from "../shared/Constants";

interface Props {
    showErrorMessage: (message: string) => void;
}

export default function EditServiceForm({ showErrorMessage }: Props) {
    const [services, setServices] = useState<ServiceInfo[]>([]);
    const [groups, setGroups] = useState<Groups>({});

    const [formValues, setFormValues] = useState({
        description: "",
        after: "",
        the_type: "",
        execStart: "",
        workingDirectory: "",
        restart: "",
        wantedBy: "",
        category: "",
    });

    const ServiceName = window.location.hash.split("/")[4];
    const defaultCategory = window.location.hash.split("/")[2];
    const navigate = useNavigate();

    const handleDeleteService = () => {
        DeleteService(ServiceName)
            .then((jsonString) => {
                const deleted = JSON.parse(jsonString);
                if (deleted?.Error) {
                    showErrorMessage(deleted.Error);
                } else {
                    navigate("/groups/" + defaultCategory, { replace: true });
                }
            })
            .catch((error) => {
                showErrorMessage(error);
            });
    };

    const handleEditService = () => {
        EditService(
            ServiceName,
            formValues.description,
            formValues.after,
            formValues.the_type,
            formValues.execStart,
            formValues.workingDirectory,
            formValues.restart,
            formValues.wantedBy,
            formValues.category
        )
            .then((jsonString) => {
                const parsedServices = JSON.parse(jsonString);
                if (parsedServices?.Error) {
                    showErrorMessage(parsedServices.Error);
                } else {
                    navigate(`/groups/${defaultCategory}`);
                }
            })
            .catch((error) => {
                showErrorMessage(error);
            });
    };

    useEffect(() => {
        FetchServices()
            .then((jsonString) => {
                const parsedServices = JSON.parse(jsonString);
                if (parsedServices?.Error) {
                    showErrorMessage(parsedServices.Error);
                }
                setServices(parsedServices);
            })
            .catch((error) => {
                showErrorMessage(error);
            });
    }, []);

    useEffect(() => {
        FetchServiceGroup()
            .then((jsonString: string) => {
                const parsedGroups = JSON.parse(jsonString);
                if (parsedGroups?.Error) {
                    showErrorMessage(parsedGroups.Error);
                }
                setGroups(parsedGroups);
            })
            .catch((error) => {
                showErrorMessage(error);
            });
    }, []);

    useEffect(() => {
        FetchServiceFile(ServiceName)
            .then((jsonString) => {
                const parsedServiceFile = JSON.parse(jsonString);
                if (parsedServiceFile?.Error) {
                    showErrorMessage(parsedServiceFile.Error);
                }
                const { Unit, Service, Install } = parsedServiceFile;

                setFormValues({
                    description: Unit.Description,
                    after: Unit.After,
                    the_type: Service.Type,
                    execStart: Service.ExecStart,
                    workingDirectory: Service.WorkingDirectory,
                    restart: Service.Restart,
                    wantedBy: Install.WantedBy,
                    category: defaultCategory,
                });


            })
            .catch((error) => {
                showErrorMessage(error);
            });
    }, [ServiceName]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <div className="h-[calc(100vh-10rem)] overflow-y-scroll overflow-visible">
            <div className="flex flex-col items-center justify-center mx-20">
                <h1 className="text-2xl font-bold text-deep-gray">Edit service {ServiceName}</h1>
                <form>
                    <div className="grid grid-cols-2 gap-2 w-full mt-10">
                        <label
                            htmlFor="description"
                            className="text-sm font-bold text-gray-500"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            placeholder="this is my flask service"
                            value={formValues.description}
                            onChange={handleInputChange}
                        />

                         <label htmlFor="after" className="text-sm font-bold text-gray-500">
                             After
                         </label>
                        <select
                            name="after"
                            id="after"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"

                            onChange={handleInputChange}
                            value={formValues.after}
                        >
                            {services.map((service) => {
                                return (
                                    <option key={service.Name} value={service.Name}>
                                        {service.Name}
                                    </option>
                                );
                            })}
                        </select>

                        <label htmlFor="type" className="text-sm font-bold text-gray-500">
                            Type
                        </label>
                        <select name="the_type" id="type" className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"  onChange={handleInputChange} value={formValues.the_type}>
                            {types.map((type) => {
                                return (<option key={type} value={type}>
                                    {type}
                                </option>)
                            })}
                        </select>

                        <label htmlFor="execStart" className="text-sm font-bold text-gray-500">
                            ExecStart
                        </label>
                        <input value={formValues.execStart} type="text" name="execStart" id="execStart" className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple" placeholder="/usr/bin/python3 app.py"  onChange={handleInputChange} />

                        <label htmlFor="workingDirectory" className="text-sm font-bold text-gray-500">
                            WorkingDirectory
                        </label>
                        <input value={formValues.workingDirectory} type="text" name="workingDirectory" id="workingDirectory" className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple" placeholder="/home/user/app"  onChange={handleInputChange} />

                        <label htmlFor="restart" className="text-sm font-bold text-gray-500">
                            Restart
                        </label>
                        <select name="restart" id="restart" className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"  onChange={handleInputChange} value={formValues.restart}>
                            {restartOptions.map((restart) => (
                                <option key={restart} value={restart}>
                                    {restart}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="wantedBy" className="text-sm font-bold text-gray-500">
                            WantedBy
                        </label>
                        <select name="wantedBy" id="wantedBy" className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"  onChange={handleInputChange} value={formValues.wantedBy}>
                            {wantedByOptions.map((wantedBy) => (
                                <option key={wantedBy} value={wantedBy}>
                                    {wantedBy}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="category" className="text-sm font-bold text-gray-500">
                            Category
                        </label>
                        <select name="category" id="category" className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"  onChange={handleInputChange} value={formValues.category}>
                            {Object.keys(groups).map((group) => (
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>

                        <button className="w-full p-2 mt-4 bg-red-500 rounded shadow text-gray-100 hover:bg-deep-gray" onClick={handleDeleteService}>
                            Delete
                        </button>
                        <button
                            className="w-full p-2 mt-4 bg-primary-purple rounded shadow text-gray-100 hover:bg-purple-600"
                            onClick={handleEditService}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

