import React, { useContext } from 'react';
import AuthContext from '../Context/AuthProvider';

const userAuth = () => {
  return useContext(AuthContext);
};

export default userAuth;
