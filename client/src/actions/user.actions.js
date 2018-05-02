export const setUser = (user) => ({
  type: 'USER.SET',
  data: { user },
});

export const login = (user) => ({
  type: 'USER.LOGIN',
  data: { user }
});

export const logout = () => ({
  type: 'USER.LOGOUT',
});
