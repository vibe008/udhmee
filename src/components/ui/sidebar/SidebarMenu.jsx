import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import SellIcon from '@mui/icons-material/Sell';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

export default function SidebarMenu() {
  const { ismenuClose, theme } = useSelector((state) => state.ui);
  const isDark = theme === 'dark';

  return (
    <Sidebar
      collapsed={!ismenuClose}
      backgroundColor={isDark ? '#0f172a' : '#f4f7fb'}
      style={{ height: '100vh', width:"100%" }}
      rootStyles={{
        '.ps-sidebar-root': {
          border: 'none',
        },
      }}
    >
      <div className="flex flex-col justify-between h-full py-6">
        <Menu
          className="px-4"
          menuItemStyles={{
            button: {
              color: isDark ? '#f1f5f9' : '#1e293b',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '0.5rem',
              margin: '8px 0',
              padding: '0.75rem 1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: isDark ? '#f1f5f9' : '#e2e8f0',
                color: isDark ? '#0f172a' : '#1e293b',
              },
            },
          }}
        >
          <MenuItem icon={<HomeIcon />}>Home</MenuItem>
          {/* <MenuItem icon={<InfoIcon />}>About</MenuItem> */}
          <MenuItem href='/category' icon={<CategoryIcon />}>Category</MenuItem>
          <MenuItem href='/tag' icon={<SellIcon />}>Tags</MenuItem>

        <div className="px-4 absolute bottom-10">
          <div className="border-t border-gray-300 my-4" />
            <MenuItem href='/signup' icon={<LoginIcon />}>
            Log In / Signup
            </MenuItem>
            <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
        </div>
        </Menu>
      </div>
    </Sidebar>
  );
}
