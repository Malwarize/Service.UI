import React from "react";
import {DeleteGroup, FetchServiceGroup} from '../../wailsjs/go/main/App';
import {Groups} from "../shared/Types";
import GroupTable from "./GroupTable";


export default  function GroupTableServices () {
    const [groups, setGroups] = React.useState<Groups>({});
    function getGroups() {
        return FetchServiceGroup();
    }
    getGroups().then((jsonString) => {
        const parsedServices = JSON.parse(jsonString);
        setGroups(parsedServices)
    }).catch((error) => {
        console.error('Error fetching services:', error);
    })
    // row = category,number of services in each category, description
    const rows: any[] = [];
    for (let category in groups) {
        let group = groups[category];
        let row = {
            "Category": category,
            "Number of Services": group.Services.length,
            "Description": group.Description
        }
        rows.push(row);
    }
    const columns = [
        {"field": "Category", "headerName": "Category","width": 300,"renderCell" : (params:any)=> (<p className="font-bold">{params.value}</p>)},
        {"field": "Number of Services", "headerName": "Number of Services","width": 200},
        {"field": "Description", "headerName": "Description","width": 300,"renderCell" : (params:any)=> (<p className="text-deep-gray">{params.value}</p>)},
        {"field": "delete", "headerName":"", renderCell: (params:any) => (
            <button onClick={(e) => {
                DeleteGroup(params.row.Category);
                e.stopPropagation();
            }}>
                <svg  className={"w-7 h-7"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            ),

        },

    ]

    return (
        <div className='h-[calc(100vh-15rem)] overflow-y-scroll overflow-visible'>
            <GroupTable rows={rows} columns={columns}/>
        </div>
    )
}