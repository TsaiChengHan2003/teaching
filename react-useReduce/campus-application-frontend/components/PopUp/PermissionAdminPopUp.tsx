
import authorityApi from '@/lib/api/authorityApi';
import styles from '@/styles/components/PopUp/permissionAdminPopUp.module.scss';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';

export default function PermissionAdminPopUp({
  setIsOpen, onSuccess,
  user,
}: {
  setIsOpen: (state: boolean) => void;
  onSuccess?: () => void;
  user: any;
}) {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [roleId, setRoleId] = useState<number>();
  const [systemId, setSystemId] = useState<number>();
  const [systemOptions, setSystemOptions] = useState<
    { key: number; value: string }[]
  >([]);
  const [roleOptions, setRoleOptions] = useState<
    { key: number; value: string }[]
  >([]);

  async function fetchDropdownOptions() {
    try {
      const response = await authorityApi.getRole();

      setSystemOptions(response.data.system);
    } catch (error) {
      console.error('下拉選單資料獲取失敗:', error);
    }
  }

  async function fetchRoleOptions(sysId: number) {
    if (!sysId) {
      return;
    }

    try {
      const response = await authorityApi.getDropdownRole({ 'systemId': sysId });

      setRoleOptions(response.data);
    } catch (error) {
      console.error('權限選單獲取失敗:', error);
    }
  }

  useEffect(() => {
    if (user) {
      setUserName(user.userName || '');
      setUserId(user.userId || '');
      setRoleId(Number(user.roleId) || undefined);
      setSystemId(Number(user.systemId) || undefined);
    }
    fetchDropdownOptions();
  }, [user]);

  useEffect(() => {
    if (systemId) {
      fetchRoleOptions(systemId);
    }
  }, [systemId]);

  const handleSave = async () => {
    try {
      await authorityApi.updatePermission({
        userId,
        'roleId': Number(roleId),
        systemId,
      });
      if (onSuccess) {
        onSuccess();
      }
      setIsOpen(false);
    } catch (error) {
      console.error('更新失敗:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.closeIcon}>
          <IoIosClose
            className={styles.close}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className={styles.inputBox}>
          <p>姓名</p>
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            disabled
          />
          <p>子系統</p>
          <select
            value={systemId}
            onChange={e => setSystemId(Number(e.target.value))}
            disabled
          >
            {systemOptions.map(item => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <p>Gmail</p>
          <input
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            disabled
          />
          <p>權限</p>
          <select
            value={roleId}
            onChange={e => setRoleId(Number(e.target.value))}
          >
            {roleOptions.map(item => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <button className={styles.addSubSystem} onClick={handleSave}>
            <FaPlus className={styles.iconSmall} />
            <span>儲存變動</span>
          </button>
        </div>
      </div>
    </div>
  );
}