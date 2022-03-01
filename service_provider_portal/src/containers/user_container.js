import React, { useState } from 'react';
import { createContainer } from 'unstated-next'

const KEY = 'user'

const useUser = () => {

  localStorage.setItem(KEY, JSON.stringify({'name': 'omar'}));

  const _getUser = () => JSON.parse(localStorage.getItem(KEY));

  const setUserName = (name) => {
    const user = _getUser();
    user.name = name;
  }

  const getUserName = () => {
    const user = _getUser();
    return user.name;
  }

  return { setUserName, getUserName };
}

const User = createContainer(useUser);

export default User;
