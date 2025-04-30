export const fetchDataBySearchBar = async ({
  state,
  dispatch,
  getListAPI,
  getPageAPI,
  searchBarArray
}: any) => {
  const { getValues } = state.formMethod;
  const { nowPage } = state;
  const params = searchBarArray.map((item: any) => {
    const value = getValues(item.registerName) !== undefined || getValues(item.registerName) !== '' ? getValues(item.registerName) : '';

    return { [item.registerName]: value };
  }).reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {});

  try {
    const listResponse = await getListAPI({ ...params, 'nowPage': nowPage || 0 });
    const pageResponse = await getPageAPI({ ...params });

    // console.log(response);

    const totalPage = pageResponse?.data?.totalPage;
    const list = listResponse?.data;

    dispatch({ 'type': 'SET_DATA', 'payload': list });
    dispatch({ 'type': 'SET_TOTAL_PAGE', 'payload': totalPage });
  } catch (error) {
    console.error(error);
  }
};