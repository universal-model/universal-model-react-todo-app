import * as React from 'react';
import store from '../../store/store';
import changeUserName from '../model/actions/changeUserName';

const HeaderView = () => {
  const { headerState } = store.getState();
  store.useState([headerState]);

  return (
    <div>
      <h1>{headerState.userName}</h1>
      <label>User name:</label>
      <input onChange={({ target: { value } }) => changeUserName(value)} />
    </div>
  );
};

export default HeaderView;
