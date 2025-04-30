import { CircularProgress } from '@mui/material';

import styles from '@/styles/components/common/Loading.module.scss';

/**
 *
 * 切換畫面或等待請求時的載入畫面
 * @returns 載入元件
 *
 * @since 1.0.0
 */

export default function Loading() {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
}