import { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "react-pro-sidebar/dist/css/styles.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:` ${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#ffffff !important",
          backgroundColor: "#3bc8ac !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-sub-menu .pro-menu-item": {
          padding: "5px 5px 5px 5px !important", // Increased padding for submenus
        },
        "& .pro-sub-menu .pro-menu-item:hover": {
          color: "#ffffff !important",
          backgroundColor: "#3bc8ac !important", // Hover effect for submenu items
        },
        "& .pro-sidebar .pro-menu .pro-menu-item.pro-sub-menu .pro-inner-list-item" : {
          paddingLeft: '0px'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="70px"
                    height="70px"
                    src={require("../../assets/images/businessman.png")}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      marginTop: 10,
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Nitin Kudesia
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    Vice President
                  </Typography>
                </Box>
              </Box>
            )}
          </MenuItem>

          <Box>
            <Menu iconShape="square">
              {/* Dashboard */}
              <MenuItem icon={<HomeOutlinedIcon />}>
                Dashboard
                <Link to="/Dashboard" />
              </MenuItem>

              {/* Authentication Submenu */}
              <SubMenu title="Authentication" icon={<PeopleOutlinedIcon />}>
                <MenuItem icon={<PersonOutlinedIcon />}>
                  All Admin <Link to="/AllAdmin" />
                </MenuItem>
                <MenuItem icon={<PersonOutlinedIcon />}>
                  Register - Admin <Link to="/AddAdmin" />
                </MenuItem>
                <MenuItem icon={<PersonOutlinedIcon />}>
                  Forget Password <Link to="/ForgetPassword" />
                </MenuItem>
              </SubMenu>

              {/* Users Submenu */}
              <SubMenu title="Users" icon={<PeopleOutlinedIcon />}>
                <MenuItem icon={<PersonOutlinedIcon />}>
                  All Users <Link to="/AllUsers" />
                </MenuItem>
                <MenuItem icon={<PersonOutlinedIcon />}>
                  Create Creators <Link to="/CreateCreators" />
                </MenuItem>
              </SubMenu>
            </Menu>
          </Box>
        </Menu>
        <SidebarFooter></SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;