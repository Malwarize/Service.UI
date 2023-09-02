import {useEffect, useState} from "react";
import {JournalLog} from "../shared/Types";
import {FetchLogsForService} from "../../wailsjs/go/main/App";
import SortableTable from "./SortableTable";
import {DataGrid, gridClasses} from "@mui/x-data-grid";

interface props {
    service: string;
    showErrorMessage: any;
}
export default  function LogViewerService(props: props){
    const [logLines, setLogLines] = useState<JournalLog[]>([
        {Timestamp: "2021-01-01 00:00:00", Message: "Loading..."}
    ]);

    useEffect(() => {
        FetchLogsForService(props.service).then((jsonString) => {
            const parsedLogs = JSON.parse(jsonString);
            if (parsedLogs?.Error) {
                props.showErrorMessage(parsedLogs.Error);
            }else{
                setLogLines(parsedLogs);
            }
        }).catch((error) => {
            props.showErrorMessage(error)
        }
        )}, []);
    function realtimeTimestampToDateTimeHourSec(realtimeTimestamp:any) {
        // Convert the microseconds timestamp to milliseconds
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
        const dateTimeHourSecString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return dateTimeHourSecString;
    }
    return (
        <div className="h-[calc(100vh-14rem)] overflow-y-scroll overflow-visible">
            <DataGrid
               columns={[
                     { field: 'Timestamp', headerName: 'Time', width: 200, sortable: true , renderCell: (params: any) =>  <p className={"text-gray-500"}>{params.value}</p>},
                     { field: 'Message', headerName: 'Message', width: 800, sortable: false },
                    ]}
                rows={logLines? logLines.map((logLine) => {
                    return {
                        id: logLine.Timestamp,
                        Timestamp: realtimeTimestampToDateTimeHourSec(logLine.Timestamp),
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
}