import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { SetUser } from '@/redux/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User2 } from 'lucide-react';




const pages = [{ name: "Home", path: "/" }, { name: "Whatsapp Chatbot", path: "/" }, { name: "pricing", path: "" }];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("user",user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);



  const handlejwtLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/logout", { withCredentials: true });
      if (response.data) {
        toast.success(response.data.message || "Logout successful");
        dispatch(SetUser(null));
          navigate("/");
      }

    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || "Error");

    }
  }
  const handleGoogleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
      if (response.data) {
        toast.success(response.data.message || "Logout successful");
        dispatch(SetUser(null));
            navigate("/");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Error");
    }
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#fff", top:0,zIndex:1000, }}>
      <Container maxWidth="xl" className='bg-white border-2 shadow-md text-black rounded-md p-5'>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontSize: '2rem',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}

          >
            BIZBOT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <NavLink key={page.name} to={page.path} style={{ textDecoration: "none", }}>
                  <Button onClick={handleCloseNavMenu} className='hover:bg-[#E0E0E0] normal-case ' sx={{ my: 2, color: 'black', display: 'block', fontWeight: "500", textTransform: "none" }}>
                    {page.name}
                  </Button>
                </NavLink>
              ))}
            </Menu>
          </Box>

          {/* desktop menu */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BIZBOT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '1rem' }}>
            {pages.map((page) => (
              <NavLink key={page.name} to={page.path} style={{ textDecoration: "none", textTransform: "none" }} >
                <Button onClick={handleCloseNavMenu} className='hover:bg-[#E0E0E0]' sx={{ my: 2, color: 'black', display: 'block', fontWeight: 700, textTransform: "none" }}>
                  {page.name}
                </Button>
              </NavLink>

            ))}
          </Box>
          {
            user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src={user?.profilePicture || <User2 />} sx={{ width: "2.5rem", height: "2.5rem" }} title={user?.name} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    setting === "Dashboard" ? (
                      <NavLink to="/dashboard/train" key={setting} style={{ textDecoration: "none", color: "inherit" }}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                      </NavLink>
                    ) : (
                      <MenuItem key={setting} onClick={() => {
                        handleCloseUserMenu(); // Close menu
                        if (setting === "Logout") {
                          if (user?.googleId) {
                            handleGoogleLogout();
                          } else {
                            handlejwtLogout();
                          }
                        }
                      }}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                      </MenuItem>
                    )
                  ))}



                </Menu>
              </Box>

            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="contained" sx={{ color: "black", border: "none", boxShadow: "none", textTransform: "none", backgroundColor: "transparent", "&:hover": { backgroundColor: "#E0E0E0", }, fontWeight: 700, fontSize: "1rem" }}>
                    Login
                  </Button>
                </NavLink>
              </Box>

            )
          }

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
