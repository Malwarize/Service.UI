import React, {useEffect, useState} from "react";
import {
  CreateService,
  FetchServices,
} from "../../wailsjs/go/main/App";
import { useNavigate } from "react-router-dom";
import {ServiceInfo} from "../shared/Types";
import {restartOptions, types, wantedByOptions} from "../shared/Constants";

interface props {
  showErrorMessage : any
}
export default function AddServiceForm(props : props ) {
  const [services, setServices] = useState<ServiceInfo[]>([]);
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

  const category = window.location.hash.split("/")[2];
  const navigate = useNavigate();

  const handleCreateService = () =>{
      const name = (
          document.getElementById("name") as HTMLInputElement
      ).value;
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
    CreateService(name,description,after,the_type,execStart,workingDirectory,restart,wantedBy,category).then((jsonString) => {
        const parsedServices = JSON.parse(jsonString);
        if (parsedServices?.Error) {
            props.showErrorMessage(parsedServices.Error);
        }else{
            navigate(`/groups/${category}`);
        }
    })
  }

  return (
    <div className="h-[calc(100vh-10rem)] overflow-y-scroll overflow-visible">
      <div className="flex flex-col items-center justify-center mx-20">
        <h1 className="text-2xl font-bold text-deep-gray">Add service</h1>
        <form>
          <div className="grid grid-cols-2 gap-2 w-full mt-10">
            <label htmlFor="name" className="text-sm font-bold text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
              placeholder="flaskwebserver"
            />

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
              placeholder="this is flask webserver for my website"
            />

            <label htmlFor="after" className="text-sm font-bold text-gray-500">
              After
            </label>
            <select
              name="after"
              id="after"
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-primary-purple"
            >
              {services.map((service, index) => (
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
            >
              {types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
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
            >
              {restartOptions.map((restart,index) => (
                <option value={restart} key={index}>{restart}</option>
              ))}
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
            >
              {wantedByOptions.map((wantedBy,index) => (
                <option value={wantedBy}  key={index}>{wantedBy}</option>
              ))}
            </select>
            <div></div>
            <button
              className="w-full p-2 mt-4 bg-primary-purple rounded shadow text-gray-100 hover:bg-purple-600"
              onClick={(e) => {
                e.preventDefault();
                handleCreateService();
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
