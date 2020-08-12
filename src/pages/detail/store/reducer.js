import * as constants from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  list:[],
  errors:[]
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.INIT_LIST_ACTION :
           return state.merge({
              'list' : action.data,
           })
        case constants.GET_EROORS_ACTION :
           return state.merge({
              'errors' : action.data
           })
        default: 
           return state;
    }
}