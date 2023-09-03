import React, { useEffect, useState } from 'react';
import {
    FetchServicesOfAGroup,
    RestartService,
    StartService,
    StopService
} from '../../wailsjs/go/main/App';
import SortableTable from './SortableTable';
import {Link} from "react-router-dom";
import {ServiceInfo} from "../shared/Types";


interface props {
    searchQuery: string;
    showErrorMessage: any;
}

function ServicesForGroup(props : props) {
    const [services, setServices] = useState<ServiceInfo[]>([]);

    // /#/group/categoryName
    const groupName = window.location.hash.split("/")[2]

    function fetchServicesData() {
        FetchServicesOfAGroup(groupName).then((jsonString) => {
            const parsedServices = JSON.parse(jsonString);
            if (parsedServices?.Error) {
                props.showErrorMessage(parsedServices.Error);
            }
            setServices(parsedServices)
        }
        ).catch((error) => {
            props.showErrorMessage(error)
            }
        )
    }


    const filteredServices = services.filter((service) =>
        service.Name.toLowerCase().includes(props.searchQuery.toLowerCase())
    );


    useEffect(() => {
        fetchServicesData(); // Initial data fetch

        const intervalId = setInterval(fetchServicesData, 500); // Fetch data every 4 seconds

        return () => {
            clearInterval(intervalId); // Cleanup on unmount
        };
    }, []);


    const handleRestartService = (serviceName: string) => {
        RestartService(serviceName)
          .then((response) => {
            const data = JSON.parse(response);
            if (data?.Error) {
              props.showErrorMessage(data.Error);
            }
          });
      };
    
      const handleStopService = (serviceName: string) => {
        StopService(serviceName)
          .then((response) => {
            const data = JSON.parse(response);
            if (data?.Error) {
              props.showErrorMessage(data.Error);
            }
          });
      };
    
      const handleStartService = (serviceName: string) => {
        StartService(serviceName)
          .then((response) => {
            const data = JSON.parse(response);
            if (data?.Error) {
              props.showErrorMessage(data.Error);
            }
          });
      };
    // right click menu edit 
    return (
        <div className='h-[calc(100vh-15rem)] overflow-y-scroll overflow-visible'>
            <SortableTable rows={filteredServices} columns={
                [
                    {"field": "Name", "headerName": "Service","width": 300,renderCell: (params: any) => (
                            <p className="font-bold">{params.value}</p>)},
                    {"field": "Status", "headerName": "Status","width": 200},
                    {"field": "Description", "headerName": "Description","width": 300},
                    {
                        "field": "edit",
                        "headerName": " ",
                        "width": 50,
                        "renderCell": (params: any) => {
                            return (
                                <button>
                                    <Link to={'/groups/' + groupName + '/editService/' + params.row.Name} onClick={(e) => {e.stopPropagation();}}>
                                    <svg className="w-4 h-4" fill="#000000" version="1.1" id="Capa_1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="800px" height="800px" viewBox="0 0 537.938 537.939"
                                    >
                                        <g>
                                            <g>
                                                <path d="M406.396,0.017L90.744,315.636L0,537.921l222.285-90.705l315.653-315.672L406.396,0.017z M198.307,424.917L58.853,481.5
			l58.632-135.182L400.023,63.89L427.2,90.636L144.403,373.318L198.307,424.917z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    </Link>
                                </button>
                            )
                        }
                    },
                    {"field": "controll", "headerName": " ","width": 50 ,"sortable": false, "renderCell": (params:any) => {
                            if (params.row.Status === 'active') {
                                return (
                                    <div>
                                        <button onClick={(e) => {
                                            handleRestartService(params.row.Name)
                                            e.stopPropagation();
                                        }
                                        }>
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                 stroke="#a7ff24">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M4.06189 13C4.02104 12.6724 4 12.3387 4 12C4 7.58172 7.58172 4 12 4C14.5006 4 16.7332 5.14727 18.2002 6.94416M19.9381 11C19.979 11.3276 20 11.6613 20 12C20 16.4183 16.4183 20 12 20C9.61061 20 7.46589 18.9525 6 17.2916M9 17H6V17.2916M18.2002 4V6.94416M18.2002 6.94416V6.99993L15.2002 7M6 20V17.2916"
                                                        stroke="#4ed813" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <button onClick={(e) => {
                                            handleStopService(params.row.Name)
                                            e.stopPropagation();
                                        }}>
                                            <svg className="h-5 w-5" viewBox="-0.5 0 25 25" fill="red" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M17 3.42004H7C4.79086 3.42004 3 5.2109 3 7.42004V17.42C3 19.6292 4.79086 21.42 7 21.42H17C19.2091 21.42 21 19.6292 21 17.42V7.42004C21 5.2109 19.2091 3.42004 17 3.42004Z"
                                                    stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                            return (
                                <button onClick={(e) => {
                                    handleStartService(params.row.Name)
                                    e.stopPropagation();
                                }}>
                                    <svg className="w-5 h-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="m 2 2.5 v 11 c 0 1.5 1.269531 1.492188 1.269531 1.492188 h 0.128907 c 0.246093 0.003906 0.488281 -0.050782 0.699218 -0.171876 l 9.796875 -5.597656 c 0.433594 -0.242187 0.65625 -0.734375 0.65625 -1.226562 c 0 -0.492188 -0.222656 -0.984375 -0.65625 -1.222656 l -9.796875 -5.597657 c -0.210937 -0.121093 -0.453125 -0.175781 -0.699218 -0.175781 h -0.128907 s -1.269531 0 -1.269531 1.5 z m 0 0"
                                                fill="#0ecdca"></path>
                                        </g>
                                    </svg>
                                </button>
                            )
                        }
                    },
                ]
            }/>
        </div>
    );
}

export default ServicesForGroup;
