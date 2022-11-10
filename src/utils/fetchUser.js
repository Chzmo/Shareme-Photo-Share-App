export const fetchUser = () => {
  const UserInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    return UserInfo
}