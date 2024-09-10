import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import SideBar from "../global/SideBar";
import TopBar from "../global/TopBar";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { FormControl } from '@mui/material';
import { tokens } from "../../theme";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      sx={{
        height: "100%",
      }}
    >
      {/* <TopBar /> */}
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box
          mx="auto"
          p={{ base: "10px", md: "20px" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          // sx={{ backgroundColor: 'wheat' }}
        >
          <Header title="Dashboard" subtitle="Welcome to dashbaord!!" />
        </Box>
        <Box mx="auto" p={{ base: "10px", md: "20px" }} sx={{ backgroundColor: 'transparent' }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="12,361"
                subtitle="Total Users"
                progress="0.75"
                // increase="+14%"
                icon={
                  <PeopleOutlinedIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="431,225"
                subtitle="Total Creators"
                progress="0.50"
                // increase="+21%"
                icon={
                  <PersonOutlinedIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="32,441"
                subtitle="New Request - Pending"
                // progress="0.30"
                // increase="+5%"
                icon={
                  <PersonAddIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="1,325,134"
                subtitle="Total Business"
                // progress="0.80"
                increase="+43%"
                icon={
                  <CurrencyRupeeOutlinedIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="5,134"
                subtitle="Current Live Creators"
                // progress="0.80"
                // increase="+43%"
                icon={
                  <PersonAddIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="5,134"
                subtitle="Current Active Users"
                // progress="0.80"
                // increase="+43%"
                icon={
                  <PersonAddIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="5,134"
                subtitle="Current Live Video Calls"
                // progress="0.80"
                // increase="+43%"
                icon={
                  <PersonAddIcon
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
              justifyContent="center"
              sx={{ borderRadius: '5%' }}
            >
              <StatBox
                title="5,134"
                subtitle="Current Live Audio Calls"
                // progress="0.80"
                // increase="+43%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
