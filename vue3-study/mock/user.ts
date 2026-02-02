function createUserList() {
  return [
    {
      id: 50,
      status: 1,
      create_time: "2022-01-05 14:07:00",
      update_time: "2022-01-16 02:32:37",
      username: "ceshi1",
      password: "123456",
      avatar: "http://img.92fa.com/pic/TX1586_07.jpg",
      role_id: 1,
      super: 0,
      route: ["home"],
      token: "admin token1",
      role: {
        id: 12,
        name: "超级管理员1",
      },
    },
    {
      id: 52,
      status: 1,
      create_time: "2022-01-05 14:07:00",
      update_time: "2022-01-16 02:32:37",
      username: "ceshi2",
      password: "123456",
      avatar: "http://img.92fa.com/pic/TX1586_04.jpg",
      role_id: 2,
      super: 0,
      route: ["home"],
      token: "admin token2",
      role: {
        id: 2,
        name: "超级管理员2",
      },
    },
  ];
}

export default [
  {
    url: "/api/user/login",
    method: "post",
    response: ({body}) => {
      const { username, password } = body;
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      );
      if (!checkUser) {
        return { code: 201, data: { message: "账号或密码不正确！" } };
      }
      const { token } = checkUser;
      return { code: 200, data: { token } };
    },
  },
  {
    url: "/api/user/info",
    method: "get",
    timeout: 100,
    response: (request) => {
      const token = request.headers.token;
      const checkUser = createUserList().find((item) => item.token === token);
      if (!checkUser) {
        return { code: 201, data: { message: "获取用户信息失败" } };
      }
      return { code: 200, data: { checkUser } };
    },
  },
];
