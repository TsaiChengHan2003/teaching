import { useEffect } from 'react';
import { fetchDataBySearchBar } from './fetchDataBySearchBar';

export default function SearchBarUtils({
  state,
  dispatch,
  searchBarArray,
  getListAPI,
  getPageAPI,
  selectDropdowns,
  labelNeeded = true,
  watchValue = []
}:any) {
  const { register, watch } = state.formMethod;
  const generateSearchBarByInputType = (item:any) => {
    switch (item.inputType) {
      case 'select':
        const options = item.options || selectDropdowns[item.registerName] || [];

        return (
          <select {...register(item.registerName)}>
            <option value={''}>全部</option>
            {options.map((item:any) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        );
      case 'text':
        return <input type={item.inputType} {...register(item.registerName)} />;
    }
  };

  const search = async () => {
    await fetchDataBySearchBar({
      'state': state,
      'dispatch': dispatch,
      'getListAPI': getListAPI,
      'getPageAPI': getPageAPI,
      'searchBarArray': searchBarArray
    });
  };

  useEffect(() => {
    search();
  }, [state.nowPage, ...(Array.isArray(watchValue) ? watchValue.map((field:any) => watch(field)) : [watch(watchValue)])]);

  return (
    <div className="d-flex justify-content-end align-items-center gap-4 p-4">
      {searchBarArray.map((item:any) => (
        <div className="d-flex" key={item.registerName} >
          {labelNeeded && <label key={item.registerName}>{item.labelName}</label>}
          { generateSearchBarByInputType(item)}
        </div>
      ))}
    </div>
  );
}