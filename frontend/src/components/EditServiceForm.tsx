import {
    FetchServices,
    FetchServiceGroup, FetchServiceFile,EditService, DeleteService
} from "../../wailsjs/go/main/App";
import { useNavigate } from "react-router-dom";
import {Groups, ServiceFile, ServiceInfo} from "../shared/Types";
import React, { useEffect, useState } from "react";
import {restartOptions, types, wantedByOptions} from "../shared/Constants";

interface props {
    showErrorMessage : any
}
export default function EditServiceForm(props : props ) {
    const [services, setServices] = useState<ServiceInfo[]>([]);
    const [groups, setGroups] = useState<Groups>({});
    const [serviceFile, setServiceFile] = useState<ServiceFile>({
        Unit: {
            Description: "",
            After: "",
        },
        Service: {
            Type: "",
            ExecStart: "",
            WorkingDirectory: "",
            Restart: "",
        },
        Install: {
            WantedBy: "",
        },
    });
    const ServiceName = window.location.hash.split("/")[4];

    const handleDeleteService = () => {
        DeleteService(ServiceName).then((jsonString) => {
            const deleted = JSON.parse(jsonString);
            if (deleted?.Error) {
                console.log(deleted)
                props.showErrorMessage(deleted.Error);
            } else{
                navigate("/groups/"+defaultCategory, { replace: true });
            }
        }).catch((error) => {
            navigate("/groups/"+defaultCategory, { replace: true });
        });
    }

    const handleEditService = () => {
        const description = (
            document.getElementById("description") as HTMLInputElement
        ).value;
        const after = (
            document.getElementById("after") as HTMLInputElement
        ).value;
        const the_type = (
            document.getElementById("the_type") as HTMLInputElement
        ).value;
        const execStart = (
            document.getElementById("execStart") as HTMLInputElement
        ).value;
        const workingDirectory = (
            document.getElementById(
                "workingDirectory"
            ) as HTMLInputElement
        ).value;
        const restart = (
            document.getElementById("restart") as HTMLInputElement
        ).value;
        const wantedBy = (
            document.getElementById("wantedBy") as HTMLInputElement
        ).value;
        const category = (
            document.getElementById("category") as HTMLInputElement
        ).value;

        EditService(ServiceName,description,after,the_type,execStart,workingDirectory,restart,wantedBy,category).then((jsonString) => {
            const parsedServices = JSON.parse(jsonString);
            if (parsedServices?.Error) {
                props.showErrorMessage(parsedServices.Error);
            }else {
                navigate(`/groups/${defaultCategory}`);
            }
        }).catch((error) => {
            props.showErrorMessage(error);
        });
    }
    useEffect(() => {
        FetchServices()
            .then((jsonString) => {
                const parsedServices = JSON.parse(jsonString);
                if (parsedServices?.Error) {
                    props.showErrorMessage(parsedServices.Error);
                }
                setServices(parsedServices);
            })
            .catch((error) => {
                props.showErrorMessage(error);
            });
    }, []);

    useEffect( () => {
        FetchServiceGroup()
        .then((jsonString:string) => {
            const parsedGroups = JSON.parse(jsonString);
            if (parsedGroups?.Error) {
                props.showErrorMessage(parsedGroups.Error);
            }
            setGroups(parsedGroups);
        })
        .catch((error) => {
            props.showErrorMessage(error);
        }
    );
    });

    useEffect( () => {
        FetchServiceFile(ServiceName)
            .then((jsonString) => {
            const parsedServiceFile = JSON.parse(jsonString);
            if (parsedServiceFile?.Error) {
                props.showErrorMessage(parsedServiceFile.Error);

            }
            setServiceFile(parsedServiceFile)
        }).catch((error) => {
            props.showErrorMessage(error);
            }
        );
        }
    );



    const defaultCategory = window.location.hash.split("/")[2];

    const navigate = useNavigate();

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
                            defaultValue={serviceFile?.Unit?.Description}
                        />

                        <label htmlFor="after" className="text-sm font-bold text-gray-500">
                            After
                        </label>
                        <select
                            name="after"
                            id="after"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            defaultValue={serviceFile?.Unit?.After}
                        >
                            {services.map((service: ServiceInfo,index) => (
                                <option key={index} value={service.Name}>{service.Name}</option>
                            ))}
                        </select>

                        <label
                            htmlFor="the_type"
                            className="text-sm font-bold text-gray-500"
                        >
                            Type
                        </label>
                        <select
                            name="the_type"
                            id="the_type"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            defaultValue={serviceFile?.Service?.Type}
                        >
                            {types.map((type,index) => (
                                <option value={type} key={index}>{type}</option>
                            ))}
                            {/*<option value={serviceFile.Service.Type}>{serviceFile.Service.Type}</option>*/}
                        </select>

                        <label
                            htmlFor="execStart"
                            className="text-sm font-bold text-gray-500"
                        >
                            ExecStart
                        </label>
                        <input
                            type="text"
                            name="execStart"
                            id="execStart"
                            placeholder="python3 run.py"
                            defaultValue={serviceFile?.Service?.ExecStart}
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                        />

                        <label
                            htmlFor="workingDirectory"
                            className="text-sm font-bold text-gray-500"
                        >
                            WorkingDirectory
                        </label>
                        {/*directory selector */}
                        <input
                            type="text"
                            name="workingDirectory"
                            id="workingDirectory"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            placeholder={"/home/username/"}
                            defaultValue={serviceFile?.Service?.WorkingDirectory}
                        />

                        <label
                            htmlFor="restart"
                            className="text-sm font-bold text-gray-500"
                        >
                            Restart
                        </label>
                        <select
                            name="restart"
                            id="restart"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            defaultValue={serviceFile?.Service?.Restart}
                        >
                            {restartOptions.map((restart,index) => (
                                <option value={restart} key={index}>{restart}</option>
                            ))}
                            {/*<option value={serviceFile.Service.Restart} key={serviceFile.Service.Restart}>{serviceFile.Service.Restart}</option>*/}
                        </select>

                        <label
                            htmlFor="wantedBy"
                            className="text-sm font-bold text-gray-500"
                        >
                            WantedBy
                        </label>
                        <select
                            name="wantedBy"
                            id="wantedBy"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            defaultValue={serviceFile?.Install?.WantedBy}
                        >
                            {wantedByOptions.map((wantedBy,index) => (
                                <option value={wantedBy} key={index}>{wantedBy}</option>
                            ))}
                            {/*<option value={serviceFile.Install.WantedBy}>{serviceFile.Install.WantedBy}</option>*/}
                        </select>
                        <label
                            htmlFor="Category"
                            className="text-sm font-bold text-gray-500"
                        >
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
                            defaultValue={defaultCategory}
                        >
                            {Object.keys(groups).map((category,index) => (
                                <option value={category} key={index}>{category}</option>
                            ))}
                            {/*<option value={defaultCategory}>{defaultCategory}</option>*/}
                        </select>
                        <button className="w-full p-2 mt-4 bg-red-500 rounded shadow text-gray-100 hover:bg-deep-gray" onClick={handleDeleteService}>
                            Delete
                        </button>
                        <button
                            className="w-full p-2 mt-4 bg-primary-purple rounded shadow text-gray-100 hover:bg-purple-600"
                            onClick={handleEditService}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
