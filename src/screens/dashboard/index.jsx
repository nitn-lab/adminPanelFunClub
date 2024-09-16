import React from "react";
import { Box, MenuItem, FormControl, Select, useTheme } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import SideBar from "../global/SideBar";
import TopBar from "../global/TopBar";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // State to manage selected filter
  const [filter, setFilter] = useState("all"); 

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Data to display based on filter
  const statsData = {
    all: [
      { title: "12,361", subtitle: "Total Users", icon: <PeopleOutlinedIcon />, link: "/AllUsers" },
      { title: "431,225", subtitle: "Total Creators", icon: <PersonOutlinedIcon />, link: "/creators" },
      { title: "32,441", subtitle: "New Requests - Pending", icon: <PersonAddIcon />, link: "/requests" },
      { title: "1,325,134", subtitle: "Total Business", icon: <CurrencyRupeeOutlinedIcon />, link: "/business" },
      { title: "5,134", subtitle: "Current Live", icon: <PersonAddIcon />, link: "/live" },
    ],
    users: [
      { title: "12,361", subtitle: "Total Users", icon: <PeopleOutlinedIcon />, link: "/AllUsers" },
      { title: "5,134", subtitle: "Current Active Users", icon: <PersonAddIcon />, link: "/active-users" },
    ],
    creators: [
      { title: "431,225", subtitle: "Total Creators", icon: <PersonOutlinedIcon />, link: "/creators" },
      { title: "5,134", subtitle: "Current Live Creators", icon: <PersonAddIcon />, link: "/live-creators" },
    ],
    business: [
      { title: "1,325,134", subtitle: "Total Business", icon: <CurrencyRupeeOutlinedIcon />, link: "/business" },
    ],
    live: [
      { title: "5,134", subtitle: "Current Live", icon: <PersonAddIcon />, link: "/live" },
    ]
  };

  // Get filtered data
  const filteredStats = statsData[filter] || statsData["all"];

  return (
    <Box display="flex" sx={{ height: "100%", overflow:"hidden" }}>
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
            {filteredStats.map((stat, index) => (
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