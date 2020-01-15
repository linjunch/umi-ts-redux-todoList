import { Dispatch } from 'redux';

export interface ListPropsType {
  dispatch: Dispatch;
  list: currentListType;
}

export interface currentListType {
  currentList: Array<ListItemType>;
}

export interface ListItemType {
  info: string;
  isFinished: boolean;
}
