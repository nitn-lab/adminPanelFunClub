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
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
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
  const [selelcted, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar className="" collapsed={isCollapsed} >
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
                  src={require('../../aasets/images/businessman.png')}
                  style={{ cursor: "pointer", borderRadius: "50%", marginTop: 10 }}
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

          <Box
          // padding={isCollapsed ? undefined : "10%"}
          >
            <Menu iconShape="square">
              <MenuItem icon={<HomeOutlinedIcon />}>
                Dashboard
                <Link to="/" />
              </MenuItem>
              <SubMenu title="Authentication" icon={<HomeOutlinedIcon />}>
                <MenuItem icon={<HomeOutlinedIcon />}>
                  All Admin <Link to="/AllAdmin" />
                </MenuItem>
                <MenuItem icon={<HomeOutlinedIcon />}>
                  Register - Admin <Link to="/AddAdmin" />
                </MenuItem>
                <MenuItem icon={<HomeOutlinedIcon />}>
                  Forget Password <Link to="/ForgetPassword" />
                </MenuItem>
              </SubMenu>

              <SubMenu title="Users" icon={<HomeOutlinedIcon />}>
                <MenuItem icon={<HomeOutlinedIcon />}>
                  All Users <Link to="/AllUsers" />
                </MenuItem>
                <MenuItem icon={<HomeOutlinedIcon />}>
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

{
  /* USER*/
}
{
  /* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
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
          )} */
}
{
  /* <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem> */
}
{
  /* <Item
              title={"Dashboard"}
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selelcted}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title={"Authentication"}
              to="/"
              icon={<PeopleOutlinedIcon />}
              selected={selelcted}
              setSelected={setSelected}
            />
            <Item
              title={"Users"}
              to="/"
              icon={<PersonOutlinedIcon />}
              selected={selelcted}
              setSelected={setSelected}
            />
            <Item
              title={"Dashboard"}
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selelcted}
              setSelected={setSelected}
            /> */
}
