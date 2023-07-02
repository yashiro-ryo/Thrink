export class UserAuthRepository {
  users = [
    {
      id: 1,
      email: "example@email.com",
      password: "password",
    },
    {
      id: 2,
      email: "hogehoge@hogehoge.com",
      password: "password",
    },
  ];

  /**
   * ユーザのemailとpasswordが一致した場合にuserIdを返す関数
   * 一致しない場合はnullを返す
   * @param email
   * @param password
   * @returns id | null
   */
  verifyUser(email: string, password: string) {
    const filterdUser = this.users.filter((user) => {
      return user.email === email && user.password === password;
    });
    if (filterdUser.length === 1) {
      return filterdUser[0].id;
    } else {
      return null;
    }
  }
}
