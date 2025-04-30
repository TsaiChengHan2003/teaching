import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import { Tooltip, IconButton, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';

import styles from '@/styles/components/layout/Navbar.module.scss';
import Logo from '@/public/images/logo.png';

/**
 *
 * 導覽列
 * @returns 導覽列
 *
 * @since 1.0.0
 */

export default function Navbar() {
  const { 'data': session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignin = async () => {
    await signIn('google');
  };

  const handleSignOut = async () => {
    signOut();
    localStorage.clear();
  };

  return (
    <nav className={styles.container}>
      <Image src={Logo} alt={''} />
      {session ?
        <>
          <Tooltip title="你的個人檔案">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ 'ml': 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src={session.user?.image as string} />
            </IconButton>
          </Tooltip><Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              'elevation': 0,
              'sx': {
                'overflow': 'visible',
                'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                'mt': 1.5,
                '& .MuiAvatar-root': {
                  'width': 32,
                  'height': 32,
                  'ml': -0.5,
                  'mr': 1,
                },
                '&::before': {
                  'content': '""',
                  'display': 'block',
                  'position': 'absolute',
                  'top': 0,
                  'right': 14,
                  'width': 10,
                  'height': 10,
                  'bgcolor': 'background.paper',
                  'transform': 'translateY(-50%) rotate(45deg)',
                  'zIndex': 0,
                },
              },
            }}
            transformOrigin={{ 'horizontal': 'right', 'vertical': 'top' }}
            anchorOrigin={{ 'horizontal': 'right', 'vertical': 'bottom' }}
          >
            <MenuItem>
              <Avatar src={session.user?.image as string} />
              {session.user?.name}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              登出
            </MenuItem>
          </Menu>
        </> :
        <div className={styles.btnGroup}>
          <button
            className={styles.loginBtn}
            onClick={() => handleSignin()}>
            登入
          </button>
        </div>}
    </nav>
  );
}