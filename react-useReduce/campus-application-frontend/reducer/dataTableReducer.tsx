const initialState = {
  'data': [],
  'totalPage': '',
  'nowPage': '',
  'isModalShow': false,
};

export const DataTableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        'data': action.payload
      };
    case 'SET_TOTAL_PAGE':
      return {
        ...state,
        'totalPage': action.payload
      };
    case 'SET_NOW_PAGE':
      return {
        ...state,
        'nowPage': action.payload
      };
    case 'SET_IS_MODAL_SHOW':
      return {
        ...state,
        'isModalShow': action.payload
      };
    default:
      return state;
  }
};