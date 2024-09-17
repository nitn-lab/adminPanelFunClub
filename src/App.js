import './App.css';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./screens/global/TopBar";
import SideBar from "./screens/global/SideBar";
import Dashboard from "./screens/dashboard";
import Login from "./screens/auth";
import SignUp from './screens/auth/SignUp';
import AllUsers from "./screens/Users/AllUsers";
import AllAdmin from "./screens/allAdmin/AllAdmin";
import AddAdmin from "./screens/Forms/AddAdmin";
import CreateCreators from "./screens/Forms/CreateCreators";
import ForgetPassword from "./screens/Forms/ForgetPassword";
import UserProfile from './screens/Users/UserProfile';
import AdminProfile from './screens/allAdmin/AdminProfile';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/auth" Component={Login} />
          <Route path="/" exact element={<Navigate to="/auth" />} />
          <Route path="/register" element={<SignUp />} />
          
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/UserProfile/:id" element={<UserProfile />} />
          <Route path="/creators" element={<AllUsers />} />
          <Route path="AllAdmin" element={<AllAdmin />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/AdminProfile/:id" element={<AdminProfile />} />
          <Route path="/CreateCreators" element={<CreateCreators />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
        </Routes>
        {/* <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
           
            
          </main>
        </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
