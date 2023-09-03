import {useEffect, useState} from "react";
import {AllJournalLog, JournalLog} from "../shared/Types";
import {FetchAllLogs} from "../../wailsjs/go/main/App";
import {DataGrid, gridClasses} from "@mui/x-data-grid";
import Loading from "../layouts/Loading";

interface props {
    showErrorMessage: any;
}
export default  function GlobalLogViewerServiceTable(props: props){
    const [logLines, setLogLines] = useState<AllJournalLog[]>([
        {Timestamp: "0000-00-00 00:00:00",HostName:"", Process:"",Message: "Loading..."}
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchAllLogs =  () => {
        FetchAllLogs().then((jsonString) => {
            const parsedLogs = JSON.parse(jsonString);
            console.log(parsedLogs)
            if (parsedLogs?.Error) {
                props.showErrorMessage(parsedLogs.Error);
            }else{
                setLogLines(parsedLogs);
                setIsLoading(false)
            }
        }).catch((error) => {
                props.showErrorMessage(error)
            }
        )
    }
    useEffect(() => {
        fetchAllLogs()
        const intervalId = setInterval(fetchAllLogs, 500);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function realtimeTimestampToDateTimeHourSec(realtimeTimestamp:any) {
        // Convert t    he microseconds timestamp to milliseconds
        const millisecondsTimestamp = parseInt(realtimeTimestamp) / 1000;

        // Create a Date object from the milliseconds timestamp
        const date = new Date(millisecondsTimestamp);

        // Extract date, time, and seconds components
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        // Create a string representing date, time, and seconds
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return (isLoading? <Loading/> : (
            <div className="h-[calc(100vh-14rem)] overflow-y-scroll overflow-visible">
                <DataGrid
                    columns={[
                        { field: 'Timestamp', headerName: 'Time', width: 200, sortable: true , renderCell: (params: any) =>  <p className={"text-gray-500"}>{params.value}</p>},
                        {field: 'HostName', headerName: 'Host', width: 100, sortable: true},
                        { field: 'Process', headerName: 'Process', width: 100, sortable: true },
                        { field: 'Message', headerName: 'Message', width: 600, sortable: false },
                    ]}
                    rows={logLines? logLines.map((logLine) => {
                        return {
                            id: logLine.Timestamp,
                            Timestamp: realtimeTimestampToDateTimeHourSec(logLine.Timestamp),
                            HostName: logLine.HostName,
                            Process: logLine.Process,
                            Message: logLine.Message
                        }
                    }) : []}
                    sx={{
                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                            outline: "none"
                        },
                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
                            outline: "none"
                        }
                    }}
                    disableDensitySelector={true}
                    disableColumnMenu={true}
                    disableColumnSelector={true}
                    disableRowSelectionOnClick={true}

                />

            </div>
        )
    )
}