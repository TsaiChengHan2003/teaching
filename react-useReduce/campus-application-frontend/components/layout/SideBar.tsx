import { FaEnvelope, FaRegCopyright, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

import styles from '../../styles/components/layout/sidebar.module.scss';
import { navBarAdminData } from '@/lib/data/navBarAdminData';
import Link from 'next/link';

// eslint-disable-next-line max-len
export default function Sidebar({ isActive }: { isActive: boolean, closeSidebar: () => void }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const fakeUser = {
    'Permission': '管理員',
    'name': '小明',
    'id': '1124a033',
  };

  return (
    <section className={`${styles.sideBar} ${isActive ? styles.active : ''}`}>
      <ul className={styles.navLink}>
        {navBarAdminData?.map((item, index) => (
          <li key={index} className={currentPath === item.Link ? styles.active : ''}>
            <Link href={item.Link}>
              <p className={styles.item}>{item.option}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            <FaUser />
            {fakeUser?.name}
          </div>
          <div className={styles.userEmail}>
            <FaEnvelope />
            &nbsp;{fakeUser?.id}
          </div>
          <button
            className={styles.userButton}
            onClick={() => router.push('https://campus-application.ntubimdbirc.tw')}>
            <FaSignOutAlt />
          返回入口網
          </button>
        </div>
      </div>
      <article className={styles.copyRight}>
        <FaRegCopyright />&nbsp;2024 NTUB BIRC
      </article>
    </section>
  );
};