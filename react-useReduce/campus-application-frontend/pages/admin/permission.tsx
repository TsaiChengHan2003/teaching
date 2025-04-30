import LayoutAdmin from '@/components/layout/LayoutAdmin';
import styles from '@/styles/pages/Admin/permissionAdmin.module.scss';
import { useEffect, useReducer, useState } from 'react';
// import PermissionAdminPopUp from '@/components/PopUp/PermissionAdminPopUp';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import authorityApi from '@/lib/api/authorityApi';
import { DataTableReducer, initialState } from '@/reducer/dataTableReducer';
import { permissionSearchBar } from '@/data/searchBar/permissionSearchBar';
import SearchBarUtils from '@/utils/searchBarUtils';
import { useForm } from 'react-hook-form';

export default function PermissionAdmin() {
  const formMethod = useForm();
  const [state, dispatch] = useReducer<any>(DataTableReducer, { ...initialState, 'formMethod': formMethod });
  const [selectDropdowns, setSelectDropdowns] = useState<any>({
    'systemId': [],
    'roleId': []
  });
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const fetchDropdownOptions = async () => {
    try {
      const response = await authorityApi.getRole();

      setSelectDropdowns({
        'roleId': response.data.userRole,
        'systemId': response.data.system
      });
    } catch (error) {
      console.error('下拉選單資料獲取失敗:', error);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  return (
    <LayoutAdmin>
      <div className={styles.container}>
        <div>
          <div className={styles.filters}>
            <SearchBarUtils
              state={state}
              dispatch={dispatch}
              searchBarArray={permissionSearchBar}
              getListAPI={authorityApi.getAuthority}
              getPageAPI={authorityApi.getPage}
              selectDropdowns={selectDropdowns}
              labelNeeded={false}
              watchValue={['systemId', 'roleId']}
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
              {state.data?.map((v:any, i:number) => (
                <tr className={styles.sheet} key={i}>
                  <td className={styles.name}>{v.userName}</td>
                  <td className={styles.subSystem}>{v.systemName}</td>
                  <td className={styles.gmail}>{v.userId}</td>
                  <td className={styles.permission}>{v.role}</td>
                  <td>
                    <button className={styles.edit} onClick={() => {
                      // setSelectedUser(v);
                      // setIsOpen(true);
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
                count={state.totalPage}
                page={state.nowPage + 1}
                onChange={(_, value) => dispatch({ 'type': 'SET_NOW_PAGE', 'payload': value - 1 })}
              />
            </Stack>
          </div>
        </div>
      </div>
      {/* {isOpen && <PermissionAdminPopUp setIsOpen={setIsOpen}
        user={selectedUser}
        onSuccess={() => {
          setIsOpen(false);
          fetchAuthority();
        }} />} */}
    </LayoutAdmin>
  );
}