import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
  StatBox,
  LineChart,
  ProgressCircle,
  BarChart,
  GeographyChart,
} from "../../components";
import {
  DownloadOutlined,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const [data, setData] = useState([]);
  // API'ga har sekundda so'rov yuborish
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://evrica-bnqt.onrender.com/parametrs/?id=0&page=1&limit=1000",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIyNDMyNjUyOTB9.IQ9py2fYA1E0PKcKfedfYxNOFdLPAnVycqXrY1MT6ks`, // Auth token qo'shildi
            "Content-Type": "application/json", // Optional, GET so'rovlarida odatda kerak emas
          },
        }
      );
      const result = await response.json();
      setData(result.data);
    };

    // Dastlabki ma'lumotni olish
    fetchData();

    // Har 1 sekundda ma'lumotni yangilash uchun interval o'rnatish
    const intervalId = setInterval(fetchData, 1000); // 1000 millisekund = 1 sekund

    // Komponent to'xtaganda intervalni tozalash
    return () => clearInterval(intervalId);
  }, []);

  // Tekshirish: data borligini va bo'sh emasligini tekshiramiz
  const dataa = data || [];
  const oxirgiIndex = dataa.length - 1;

  // Agar data hali mavjud bo'lmasa, hech nima ko'rsatmaymiz
  if (!dataa.length) {
    return <div className="loader"></div>;
  }

  function TemperaturaHolati(temperatura) {
    if (temperatura <= 15) {
      return "Sovuq";
    } else if (temperatura <= 20) {
      return "Mo'tadil";
    } else if (temperatura <= 28) {
      return "Me'yor👍";
    } else if (temperatura <= 35) {
      return "Me'yordan qisman yuqori";
    } else if (temperatura <= 45) {
      return "Yuqori harorat";
    } else {
      return "Juda xavfli";
    }
  }

  function GasHolati(gas) {
    if (gas <= 9) {
      return "Me'yor👍";
    } else if (gas <= 35) {
      return "Yengil xavf";
    } else if (gas <= 50) {
      return "O'rtacha xavfsizlik darajasi";
    } else if (gas <= 100) {
      return "Og’ir xavflilik darajasi";
    } else if (gas <= 200) {
      return "Salomatlik uchun o’ta xavfli";
    } else if (gas <= 400) {
      return "Hayot uchun o’ta havfli";
    } else {
      return "Hayot uchun havfli xudud";
    }
  }

  function NamlikHolati(namlik) {
    if (namlik <= 15) {
      return "Quruq, o’ta havfli";
    } else if (namlik <= 40) {
      return "Quruq havo, teri quruqlashishi, allergiya belgilari kuzatilishi mumkin";
    } else if (namlik <= 60) {
      return "Me'yor👍";
    } else if (namlik <= 80) {
      return "Odatda, qulay, organizmda sezilarli o’zgarishlar kuzatiladi.";
    } else if (namlik <= 100) {
      return "Og'ir namlik, nafas olishda qiyinchiliklar, sog'liq muammolari xavfi mavjud.";
    } else {
      return "JUDA HAM XAVFLI💀";
    }
  }

  function ChangHolati(chang) {
    if (chang <= 15) {
      return "Me'yor👍";
    } else if (chang <= 35) {
      return "Yengil xavf";
    } else if (chang <= 300) {
      return "Hayot va salomatlik uchun havfli";
    } else {
      return "JUDA HAM XAVFLI💀";
    }
  }
  function TabiyGazHolati(gas) {
    if (gas <= 1) {
      return "Me'yor👍";
    } else if (gas <= 5) {
      return "Xavfli";
    } else {
      return "JUDA HAM XAVFLI💀";
    }
  }

  return (
    data && (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Header
            title="BOSHQARUV TIZIMI"
            subtitle="Assalomu alaykum saytimizga xush kelibsiz"
          />
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns={
            isXlDevices
              ? "repeat(12, 1fr)"
              : isMdDevices
              ? "repeat(6, 1fr)"
              : "repeat(3, 1fr)"
          }
          gridAutoRows="140px"
          gap="20px">
          {/* Statistic Items */}
          <Box
            gridColumn="span 3"
            bgcolor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title="Xona harorati"
              subtitle={TemperaturaHolati(dataa[oxirgiIndex].temperatura)}
              progress="1"
              increase={dataa[oxirgiIndex].temperatura + "°C"}
              icon={
                <ThermostatIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title="Gaz miqdori"
              subtitle={GasHolati(dataa[oxirgiIndex].gas)}
              progress="0.50"
              increase={dataa[oxirgiIndex].gas + ""}
              icon={
                <GasMeterIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title="Namlik"
              subtitle={NamlikHolati(dataa[oxirgiIndex].wet)}
              progress="0.30"
              increase={dataa[oxirgiIndex].wet + ""}
              icon={
                <WaterDamageIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title="Chang"
              subtitle={ChangHolati(dataa[oxirgiIndex].dust1)}
              progress="0.80"
              increase={dataa[oxirgiIndex].dust1}
              icon={
                <WarehouseIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>{" "}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title="Yoritilganlik"
              subtitle={ChangHolati(dataa[oxirgiIndex].dust1)}
              progress="0.80"
              increase={dataa[oxirgiIndex].dust1}
              icon={
                <Brightness6Icon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <StatBox
              title="Tabiy gaz"
              subtitle={TabiyGazHolati(dataa[oxirgiIndex].natural_gas)}
              progress="0.80"
              increase={dataa[oxirgiIndex].natural_gas}
              icon={
                <OilBarrelIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>{" "}
          {/* ---------------- Row 2 ---------------- */}
          {/* Line Chart */}
          {/* <Box
            gridColumn={
              isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
              }
              gridRow="span 2"
              bgcolor={colors.primary[400]}>
              <Box
              mt="25px"
              px="30px"
              display="flex"
              justifyContent="space-between">
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.gray[100]}>
                  Ma'lumotlar{" "}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}>
                  {dataa[oxirgiIndex].date}
                </Typography>
              </Box> */}
          {/* <IconButton>
                <DownloadOutlined
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
          {/* </Box>
            <Box height="250px" mt="-20px">
              <LineChart isDashboard={true} />
            </Box>
          </Box> */}
          {/* Transaction Data
          <Box
            gridColumn={isXlDevices ? "span 4" : "span 3"}
            gridRow="span 2"
            bgcolor={colors.primary[400]}
            overflow="auto">
            <Box borderBottom={4px solid ${colors.primary[500]}} p="15px">
              <Typography
                color={colors.gray[100]}
                variant="h5"
                fontWeight="600">
                Recent Transactions
              </Typography>
            </Box>

            {mockTransactions.map((transaction, index) => (
              <Box
                key={${transaction.txId}-${index}}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottom={4px solid ${colors.primary[500]}}
                p="15px">
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600">
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.gray[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Typography color={colors.gray[100]}>
                  {transaction.date}
                </Typography>
                <Box
                  bgcolor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px">
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Revenue Details */}
          {/* <Box
            gridColumn={isXlDevices ? "span 4" : "span 3"}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px">
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px">
              <ProgressCircle size="125" />
              <Typography
                textAlign="center"
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}>
                $48,352 revenue generated
              </Typography>
              <Typography textAlign="center">
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box> */}
          {/* Bar Chart */}
          {/* <Box
            gridColumn={isXlDevices ? "span 4" : "span 3"}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ p: "30px 30px 0 30px" }}>
              Sales Quantity
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="250px"
              mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box> */}
          {/* Geography Chart */}
          {/* <Box
            gridColumn={isXlDevices ? "span 4" : "span 3"}
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px">
            <Typography variant="h5" fontWeight="600" mb="15px">
              Geography Based Traffic
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>  */}
        </Box>
      </Box>
    )
  );
}

export default Dashboard;
