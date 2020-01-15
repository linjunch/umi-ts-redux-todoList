import { Effect } from 'dva';
import { Reducer } from 'redux';
import { ListItemType } from '@/interface/List';

export interface SaveListItemType {
  currentList: Array<ListItemType>;
}

interface ListStateType extends SaveListItemType {}

interface ListModelType {
  namespace: 'list';
  state: ListStateType;
  effects: {
    // addItem: Effect;
  };
  reducers: {
    addListItem: Reducer<SaveListItemType>;
    togglefinishedState: Reducer<SaveListItemType>;
    deleteListItem: Reducer<SaveListItemType>;
    selectAll: Reducer<SaveListItemType>;
    cancelAll: Reducer<SaveListItemType>;
    toggleAll: Reducer<SaveListItemType>;
    deleteFinished: Reducer<SaveListItemType>;
  };
}

const ListModel: ListModelType = {
  namespace: 'list',
  state: {
    currentList: [],
  },
  effects: {
    // *addItem({ payload }, { call, put }) {
    //   const response = yield call(list, payload);
    //   if (response && response.code === 0) {
    //     yield put({
    //       type: 'save',
    //       payload: response,
    //     });
    //   }
    // },
  },
  reducers: {
    addListItem(state, action) {
      const { currentList } = state!;
      const { iptValue } = action.payload;
      currentList.push({
        info: iptValue,
        isFinished: false,
      });
      return {
        ...state,
        currentList,
      };
    },
    togglefinishedState(state, action) {
      const { currentList } = state!;
      const { index } = action.payload;
      currentList[index].isFinished = !currentList[index].isFinished;
      return {
        ...state,
        currentList,
      };
    },
    deleteListItem(state, action) {
      const { currentList } = state!;
      const { index } = action.payload;
      currentList.splice(index, 1);
      return {
        ...state,
        currentList,
      };
    },
    selectAll(state) {
      const { currentList } = state!;
      currentList.forEach((item: { isFinished: boolean }) => {
        item.isFinished = true;
      });
      return {
        ...state,
        currentList,
      };
    },
    cancelAll(state) {
      const { currentList } = state!;
      currentList.forEach((item: { isFinished: boolean }) => {
        item.isFinished = false;
      });
      return {
        ...state,
        currentList,
      };
    },
    toggleAll(state) {
      const { currentList } = state!;
      currentList.forEach((item: { isFinished: boolean }) => {
        item.isFinished = !item.isFinished;
      });
      return {
        ...state,
        currentList,
      };
    },
    deleteFinished(state) {
      const { currentList } = state!;
      return {
        ...state,
        currentList: currentList.filter(
          (item: { isFinished: boolean }) => item.isFinished === false,
        ),
      };
    },
  },
};

export default ListModel;
