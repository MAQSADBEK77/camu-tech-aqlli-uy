import { Box, Typography, useTheme } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";
import { useFetch } from "../../hooks/useFetch";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

const Team = () => {
  const { data } = useFetch(
    "https://evrica-bnqt.onrender.com/parametrs/?id=0&page=1&limit=1000"
  );
  let dataa = data && data.data;
  const lastTenItems = dataa && dataa.length > 0 ? [...dataa].reverse() : [];;
dataa = lastTenItems
  const oxirgiIndex = dataa && dataa.length - 1;
  // console.log(dataa);
  if (Array.isArray(dataa)) {
    for (let i = 0; i < dataa.length; i++) {
      dataa[i];
    }
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "xona",
      headerName: "Xona",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "temperatura",
      headerName: "Temperatura",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "gas", headerName: "Gas", flex: 1 },
    { field: "wet", headerName: "Wet", flex: 1 },
    { field: "dust1", headerName: "Dust1", flex: 1 },
    { field: "dust2", headerName: "Dust2", flex: 1 },

    {
      field: "dust3",
      headerName: "Dust3",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header title="TARIX" subtitle="Xona parametrlari tarixi" />
      <Box
        mt="40px"
        height="75vh"
        flex={1}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
        }}>
        {dataa && (
          <DataGrid
            rows={dataa}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            checkboxSelection
          />
        )}
      </Box>
    </Box>
  );
};

export default Team;
