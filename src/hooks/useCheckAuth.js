import { useDispatch, useSelector } from 'react-redux';
import {
  authenticateUser,
  deleteFromLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '../helpers/helperFunction';
import { authAction } from '../store/authStore';

export function useCheckAuth() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authStore);

  const checkAuth = async () => {
    if (!authData.loggedIn) {
      const localData = getFromLocalStorage('loginInfo', true);

      if (localData === -1) {
        dispatch(
          authAction.setAuthStatus({ loggedIn: false, authLoading: false })
        );
      } else {
        const response = await authenticateUser(
          localData.timeOfLogin,
          localData.refreshToken
        );

        if (response === -1) {
          dispatch(
            authAction.setAuthStatus({ loggedIn: false, authLoading: false })
          );
          deleteFromLocalStorage('loginInfo');
        } else if (response === true) {
          const payload = {
            username: localData.username,
            authLoading: false,
            loggedIn: true,
            accessToken: localData.accessToken,
            refreshToken: localData.refreshToken,
            userId: localData.userId,
            user_type: localData.user_type,
            timeOfLogin: localData.timeOfLogin,
            user_role: localData.user_role,
            logInOperation: 1,
          };
          dispatch(authAction.setAuthStatus(payload));
          setToLocalStorage('loginInfo', payload, true);
        } else if (!response?.data?.access) {
          dispatch(
            authAction.setAuthStatus({ loggedIn: false, authLoading: false })
          );
        } else {
          const localObj = {
            accessToken: response.data.access,
            refreshToken: localData.refreshToken,
            user_type: localData.user_type,
            userId: localData.userId,
            timeOfLogin: localData.timeOfLogin,
            username: localData.username,
            user_role: localData.user_role,
          };
          setToLocalStorage('loginInfo', localObj, true);
          dispatch(
            authAction.setAuthStatus({
              username: localData.username,
              authLoading: false,
              loggedIn: true,
              accessToken: response.data.access,
              refreshToken: localData.refreshToken,
              user_type: localData.user_type,
              user_role: localData.user_role,
              userId: localData.userId,
              timeOfLogin: localData.timeOfLogin,
              logInOperation: 1,
            })
          );
        }
      }
    }
  };

  return {
    checkAuth,
  };
}
