import { Box, useMediaQuery } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import React from "react"

interface RankingTableProps {
    title?: string
    columns: GridColDef[]
    rows: any
}

export const RankingTable: React.FC<RankingTableProps> = ({ title, columns, rows }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100%",
                height: isMobile ? "auto" : "58%",
                padding: isMobile ? "8vw 5vw" : "1vw  ",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                borderRadius: isMobile ? "0 2vw 0 0" : "0 2vw 0 2vw ",
                gap: "1vw",
            }}
        >
            {" "}
            <p style={{ fontWeight: "600", color: "#9C9C9C", fontSize: "0.8vw" }}>{title}</p>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    sorting: {
                        sortModel: [{ field: "time", sort: "desc" }],
                    },
                    pagination: {
                        paginationModel: {
                            pageSize: 4,
                        },
                    },
                }}
                pageSizeOptions={[5]}
            />
        </Box>
    )
}
