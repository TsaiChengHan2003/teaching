
import styles from '@/styles/components/layout/NavbarAdmin.module.scss';
import sidebarStyles from '@/styles/components/layout/sidebar.module.scss';
import { navBarAdminData } from '@/lib/data/navBarAdminData';
import Link from 'next/link';
import { FaUser, FaChevronDown, FaBars } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from './SideBar';
import { useSession } from 'next-auth/react';
import userAPI from '@/lib/api/userAPI';

export default function Navbar() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [sideBar, setSideBar] = useState<boolean>(false);
  const { 'data': session } = useSession();
  const [permission, setPermission] = useState('');

  useEffect(() => {
    if (session) {
      console.log('Session:', session);
      getUser();
    }
  }, [session]);

  async function getUser() {
    try {
      const response = await userAPI.getPermission();

      console.log('Permission response:', response);
      setPermission(response.data);
    } catch (error) {
      console.error('使用者資訊獲取失敗:', error);
    }
  }

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    const handleResize = () => {
      const isXLarge = window.innerWidth > 1024;

      if (isXLarge) {
        setSideBar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <section className={styles.navspaces}>
          <FaBars className={styles.barButton} onClick={toggleSideBar} />
        </section>
        <section className={styles.mainTitle}>
          <h1>校園入口網後台</h1>
        </section>
        <section className={styles.button}>
          <ul className={styles.navLink}>
            {navBarAdminData?.map((item, index) => (
              <li key={index} >
                <Link href={item.Link}>
                  <p className={currentPath === item.Link ? styles.active : ''}>{item.option}</p>
                </Link>
              </li>
            ))}
            <li className={styles.userAccount}>
              <Link href={''}>
                <p>
                  <FaUser />
                  &nbsp;{permission}&nbsp;
                  <FaChevronDown />
                </p>
              </Link>
              <div className={styles.popup}>
                <p>{session?.user?.email}</p>
                <p>{session?.user?.name}</p>
                <button className={styles.logout} onClick={() => router.push('https://campus-application.ntubimdbirc.tw/')}>登出</button>
              </div>
            </li>
          </ul>
        </section>
      </nav>
      <div
        className={`${sidebarStyles.overlay} ${sideBar ? sidebarStyles.active : ''}`}
        onClick={toggleSideBar}
      />
      <Sidebar isActive={sideBar} closeSidebar={toggleSideBar} />
    </>
  );
}