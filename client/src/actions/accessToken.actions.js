export const setAccessToken = (accessToken) => ({
  type: "ACCESS_TOKEN.SET",
  data: { accessToken },
});

export const removeAccessToken = () => ({
  type: "ACCESS_TOKEN.REMOVE",
});
