export const initialState = {
  'data': [],
  'totalPage': 1,
  'nowPage': 0,
  'isModalShow': false,
  'formMethod': () => {},
};

export const DataTableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      console.log(action.payload);
      return {
        ...state,
        'data': action.payload
      };
    case 'SET_TOTAL_PAGE':
      console.log(action.payload);
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