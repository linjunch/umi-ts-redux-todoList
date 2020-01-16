import React, { useState } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Input, List, Checkbox, Popconfirm, message, Button } from 'antd';
import { ListPropsType } from '@/interface/list';

const { Search } = Input;

const TodoList = (props: ListPropsType) => {
  const {
    dispatch,
    list: { currentList },
  } = props;

  const [iptValue, setIptValue] = useState<string>('');

  const handleIptChange = (value: string) => {
    setIptValue(value);
  };

  const addListItem = () => {
    if (iptValue) {
      dispatch({
        type: 'list/addListItem',
        payload: { iptValue },
      });
      setIptValue('');
    } else {
      message.error({
        content: '不能为空',
        duration: 0.5,
      });
    }
  };

  const toggleFinishedState = (index: number) => {
    dispatch({
      type: 'list/togglefinishedState',
      payload: { index },
    });
  };

  const deleteListItem = (index: number) => {
    dispatch({
      type: 'list/deleteListItem',
      payload: { index },
    });
    message.success({
      content: 'delete success',
      duration: 0.5,
    });
  };

  const selectAll = () => {
    dispatch({
      type: 'list/selectAll',
    });
  };

  const cancelAll = () => {
    dispatch({
      type: 'list/cancelAll',
    });
  };

  const toggleAll = () => {
    dispatch({
      type: 'list/toggleAll',
    });
  };

  const deleteFinished = () => {
    if (currentList.find(item => item.isFinished === true)) {
      dispatch({
        type: 'list/deleteFinished',
      });
      message.success({
        content: 'delete success',
        duration: 0.5,
      });
    } else {
      message.error({
        content: 'Please select at least one',
        duration: 0.5,
      });
    }
  };

  const handleKeyDown = (keyCode: number) => {
    if (keyCode === 13) {
      addListItem();
    }
  };

  return (
    <div>
      <Search
        placeholder="please input what you want to do!"
        enterButton="添加"
        className={styles.ipt}
        value={iptValue}
        onChange={e => {
          handleIptChange(e.target.value);
        }}
        onSearch={addListItem}
        onKeyDown={e => {
          handleKeyDown(e.keyCode);
        }}
      />
      <div className={styles.btnBox}>
        <Button onClick={selectAll}>全部选中</Button>
        <Button onClick={cancelAll}>全部取消</Button>
        <Button onClick={toggleAll}>反选</Button>
        <Popconfirm
          className={styles.btn}
          title="Are you sure delete all selected item?"
          onConfirm={deleteFinished}
        >
          删除所有已完成
        </Popconfirm>
      </div>
      <List
        bordered
        dataSource={currentList}
        className={styles.ipt}
        renderItem={(item, index) => (
          <List.Item>
            <div className={styles.flexBox}>
              <Checkbox
                onChange={() => {
                  toggleFinishedState(index);
                }}
                className={styles.checkbox}
                checked={item.isFinished}
              >
                {item.info}
              </Checkbox>
              <Popconfirm
                className={styles.delete}
                title="Are you sure delete this item?"
                onConfirm={() => {
                  deleteListItem(index);
                }}
              >
                删除
              </Popconfirm>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default connect(({ list }: ListPropsType) => ({
  list,
}))(TodoList);
