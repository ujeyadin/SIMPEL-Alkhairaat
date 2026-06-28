import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const menuItems = [
    { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { label: 'Data Sekolah', icon: SchoolIcon, path: '/schools' },
    { label: 'Keuangan', icon: AttachMoneyIcon, path: '/finance' },
    { label: 'Aset', icon: InventoryIcon, path: '/assets' },
    { label: 'Buku Tamu', icon: PeopleIcon, path: '/visitors' },
    { label: 'Surat Masuk/Keluar', icon: MailIcon, path: '/letters' },
    { label: 'Manajemen Pengguna', icon: PeopleIcon, path: '/users' },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976D2' }}>
          🎓 SIMPEL-Alkhairaat
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <Icon sx={{ color: '#1976D2' }} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            backgroundColor: '#F5F5F5',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {/* AppBar */}
        <AppBar
          position="sticky"
          sx={{ backgroundColor: '#1976D2' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flex: 1 }} />

            {/* User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFF',
                  color: '#1976D2',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={handleMenuClick}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" sx={{ color: 'white', display: { xs: 'none', sm: 'block' } }}>
                {user.name}
              </Typography>
            </Box>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {user.role}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate('/profile')}>
                👤 Profil
              </MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>
                ⚙️ Pengaturan
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ backgroundColor: '#F9F9F9', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
