import React, { useState, useEffect } from "react";
import { Box, MenuItem, FormControl, Select, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom"; // Import NavLink
import SideBar from "../global/SideBar";
import TopBar from "../global/TopBar";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import axios from "axios";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to manage selected filter
  const [filter, setFilter] = useState("all");

  // State to store total users and other dynamic data
  const [statsData, setStatsData] = useState({
    totalUsers: "Loading...",
    // totalCreators: "Loading...",
    // newRequests: "Loading...",
    // totalBusiness: "Loading...",
    // currentLive: "Loading..."
  });

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Fetch data from the API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get("http://3.110.156.153:5000/api/v1/users", {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(response.data.data.length)
        setStatsData({
          totalUsers: response.data.data.length,
          // totalCreators: response.data.totalCreators,
          // newRequests: response.data.newRequests,
          // totalBusiness: response.data.totalBusiness,
          // currentLive: response.data.currentLive
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Data to display based on filter
  const filteredStats = {
    all: [
      { title: statsData.totalUsers, subtitle: "Total Users", icon: <PeopleOutlinedIcon />, link: "/AllUsers" },
      { title: "123", subtitle: "Total Creators", icon: <PersonOutlinedIcon />, link: "/creators" },
      { title: "123", subtitle: "New Requests - Pending", icon: <PersonAddIcon />, link: "/requests" },
      { title: "123", subtitle: "Total Business", icon: <CurrencyRupeeOutlinedIcon />, link: "/business" },
      { title: "123", subtitle: "Current Live", icon: <PersonAddIcon />, link: "/live" },
    ],
    users: [
      { title: statsData.totalUsers, subtitle: "Total Users", icon: <PeopleOutlinedIcon />, link: "/AllUsers" },
      { title: "123", subtitle: "Current Active Users", icon: <PersonAddIcon />, link: "/active-users" },
    ],
    creators: [
      { title: "123", subtitle: "Total Creators", icon: <PersonOutlinedIcon />, link: "/creators" },
      { title: "123", subtitle: "Current Live Creators", icon: <PersonAddIcon />, link: "/live-creators" },
    ],
    business: [
      { title: "123", subtitle: "Total Business", icon: <CurrencyRupeeOutlinedIcon />, link: "/business" },
    ],
    live: [
      { title: "123", subtitle: "Current Live", icon: <PersonAddIcon />, link: "/live" },
    ],
  };

  return (
    <Box display="flex" sx={{ height: "100%", overflow: "hidden" }}>
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box mx="auto" p={{ base: "10px", md: "20px" }} display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Dashboard" subtitle="Welcome to the dashboard!" />

          {/* Filter dropdown */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select value={filter} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="users">Users</MenuItem>
              <MenuItem value="creators">Creators</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="live">Live</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mx="auto" p={{ base: "10px", md: "20px" }} sx={{ backgroundColor: 'transparent' }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
            {filteredStats[filter].map((stat, index) => (
              <Box
                key={index}
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  borderRadius: '5%',
                  transition: 'all 0.3s ease',
                  '&:hover': { scale: '1.06', cursor: 'pointer' }
                }}
              >
                <NavLink
                  to={stat.link}
                  style={{ textDecoration: 'none', width: '100%', height: '100%', paddingTop: "10px" }} // Keep the link styling inline and cover the whole box
                >
                  <StatBox
                    title={stat.title}
                    subtitle={stat.subtitle}
                    icon={React.cloneElement(stat.icon, { sx: { color: colors.greenAccent[600], fontSize: "26px" } })}
                  />
                </NavLink>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;