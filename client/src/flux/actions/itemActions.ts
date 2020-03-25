import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IItem } from '../../types/interfaces';
export const getItems = () => async (dispatch: Function, getState: Function) => {
  dispatch(setItemsLoading());
  let user = getState().auth.user;
  let userId = user._id ? user._id : user.id;  
  await axios
    .get(`/api/items/${userId}`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item: IItem) => async (
  dispatch: Function,
  getState: Function
) => {
  let user = getState().auth.user;
  let userId = user._id ? user._id : user.id;
  item.userId = userId  
  await  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id: string) => async (
  dispatch: Function,
  getState: Function
) => {
  await axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
