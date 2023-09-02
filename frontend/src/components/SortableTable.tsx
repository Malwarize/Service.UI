import { DataGrid, GridValueGetterParams,gridClasses } from '@mui/x-data-grid';
import * as React from 'react';
import {useNavigate} from "react-router-dom";

export default function SortableTable({ rows, columns }: any) {

    rows = rows.map((row: any, index: number) => {
        row.id = index;
        return row;
    });

    // active status icon and inactive status icon
    columns[1].renderCell = (params: GridValueGetterParams) => {
        if (params.value === 'active') {
            return (
                <div className="space-x-2">
                    <span>
                        <svg className="w-4 h-4 fill-current text-green-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/>
                        </svg>
                    </span>
                    <span>active</span>
                </div>
            );
        } else {
            return (
                <div className="space-x-2">
                    <span>
                        <svg className="w-4 h-4 fill-current text-red-500 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16z"/>
                        </svg>
                    </span>
                    <span>inactive</span>
                </div>

            );
        }
    }
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
                    navigate(`/logs/${params.row.Name}`)
                }
                }
                className={'cursor-pointer'}
                //disable cell selection effect on click

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