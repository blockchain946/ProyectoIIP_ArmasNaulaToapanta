import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { text: 'Requisiciones', icon: <DescriptionIcon />, path: '/requisitions', roles: ['GERENTE', 'DIRECTOR_RRHH'] },
    { text: 'Vacantes', icon: <WorkIcon />, path: '/vacancies', roles: ['DIRECTOR_RRHH'] },
    { text: 'Candidatos', icon: <PeopleIcon />, path: '/candidates', roles: ['DIRECTOR_RRHH'] },
    { text: 'Evaluaciones', icon: <AssessmentIcon />, path: '/evaluations', roles: ['POSTULANTE', 'DIRECTOR_RRHH'] },
    { text: 'Selección', icon: <CheckCircleIcon />, path: '/selection', roles: ['DIRECTOR_RRHH'] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema de Reclutamiento ABCXYZ
          </Typography>
          {user && (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.name} ({user.role})
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems
              .filter((item) => item.roles.includes(user?.role || ''))
              .map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 