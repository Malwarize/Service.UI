import {DataGrid, gridClasses, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import * as React from 'react';
import {makeStyles} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
export default function GroupTable({ rows, columns }: any) {

    rows = rows.map((row: any, index: number) => {
        row.id = index;
        return row;
    });
    const navigate = useNavigate();

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableDensitySelector={true}
                disableColumnMenu={true}
                disableColumnSelector={true}
                rowSelection={false}
                onRowClick={(params) => {
                    navigate(`/groups/${params.row.Category}`)
                }}
                className={'cursor-pointer'}
                sx={{
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: "none"
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
                        outline: "none"
                    }
                }}
            />
        </div>
    );
}