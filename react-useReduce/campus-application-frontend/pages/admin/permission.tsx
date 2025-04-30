import LayoutAdmin from '@/components/layout/LayoutAdmin';
import styles from '@/styles/pages/Admin/permissionAdmin.module.scss';
import { useEffect, useState } from 'react';
import PermissionAdminPopUp from '@/components/PopUp/PermissionAdminPopUp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import authorityApi from '@/lib/api/authorityApi';

export default function PermissionAdmin() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authority, setAuthority] = useState<any[]>([]);
  const [systemId, setSystemId] = useState<number | undefined>();
  const [roleId, setRoleId] = useState<number | undefined>();
  const [userId, setUserId] = useState<string>('');
  const [roleOptions, setRoleOptions] = useState<
    { key: number; value: string }[]
  >([]);
  const [systemOptions, setSystemOptions] = useState<
    { key: number; value: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPage] = useState<number>(1);

  async function fetchAuthority() {
    try {
      const response = await authorityApi.getAuthority({
        'systemId': systemId || undefined,
        'roleId': roleId || undefined,
        'userId': userId.trim(),
        'nowPage': currentPage,
      });

      setAuthority(response.data || []);
    } catch (error) {
      console.error('權限清單獲取失敗:', error);
    }
  }

  async function fetchPage() {
    try {
      const response = await authorityApi.getPage({
        'systemId': systemId || undefined,
        'roleId': roleId || undefined,
        'userId': userId.trim(),
      });

      setTotalPage(response.data.totalPage || 1);
    } catch (error) {
      console.error('頁碼獲取失敗:', error);
    }
  }

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  useEffect(() => {
    fetchAuthority();
    fetchPage();
  }, [systemId, roleId, userId, currentPage]);

  async function fetchDropdownOptions() {
    try {
      const response = await authorityApi.getRole();

      setRoleOptions(response.data.userRole);
      setSystemOptions(response.data.system);
    } catch (error) {
      console.error('下拉選單資料獲取失敗:', error);
    }
  }

  return (
    <LayoutAdmin>
      <div className={styles.container}>
        <div>
          <div className={styles.filters}>
            <select
              value={systemId}
              onChange={e => setSystemId(Number(e.target.value))}
              className={styles.select}
            >
              <option value={undefined}>全部</option>
              {systemOptions.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            <select
              value={roleId}
              onChange={e => setRoleId(Number(e.target.value))}
              className={styles.select}
            >
              <option value={undefined}>全部</option>
              {roleOptions.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="搜尋 Gmail"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              className={styles.input}
            />
          </div>
          <table className={styles.table}>
            <thead className={styles.title}>
              <tr>
                <th>姓名</th>
                <th>子系統</th>
                <th>Gmail</th>
                <th>權限</th>
              </tr>
            </thead>
            {/* <hr className={styles.line} /> */}
            <tbody className={styles.h}>
              {authority?.map((v, i) => (
                <tr className={styles.sheet} key={i}>
                  <td className={styles.name}>{v.userName}</td>
                  <td className={styles.subSystem}>{v.systemName}</td>
                  <td className={styles.gmail}>{v.userId}</td>
                  <td className={styles.permission}>{v.role}</td>
                  <td>
                    <button className={styles.edit} onClick={() => {
                      setSelectedUser(v);
                      setIsOpen(true);
                    }}>編輯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <div>
          <div className={styles.number}>
            <Stack spacing={2}>
              <Pagination
                shape="rounded"
                count={totalPages}
                page={currentPage + 1}
                onChange={(_, value) => setCurrentPage(value - 1)}
              />
            </Stack>
          </div>
        </div>
      </div>
      {isOpen && <PermissionAdminPopUp setIsOpen={setIsOpen}
        user={selectedUser}
        onSuccess={() => {
          setIsOpen(false);
          fetchAuthority();
        }} />}
    </LayoutAdmin>
  );
}