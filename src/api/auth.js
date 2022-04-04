import client from "./client";

// const login = (name, password) => client.post("/user/signin", { name, password });
// const sendCode = (name, email) => client.post("/user/sendCode", { name, email });
// const register = (data) => client.post("/user/signup", data);
// const sendResetCode = (email) => client.post("/user/resetCode", { email });
// const resetPassword = (email, newPassword, code) => client.post("/user/ResetPassword", { email, newPassword, code });

// export default {
//   login,
//   register,
//   sendCode,
//   sendResetCode,
//   resetPassword
// };


import decode from 'jwt-decode';

export const login = (user) => client.post('/api/users/login', {
  email: user.email,
  password: user.password,
  role: user.role
});

export const forgotPassword = (email) => client.post('/auth/forgotPassword',
  {
    email
  }
);


export const resetPassword = (data, token) => {
  return client.patch(`/auth/resetPassword/${token}`,
    {
      password: data.password,
      passwordConfirm: data.confirmPassword
    }
  );
};
export const updatePassword = (data) => {
  return client.patch('/auth/updatePassword',
    {
      passwordCurrent: data.currentPassword,
      password: data.newPassword,
      passwordConfirm: data.confirmNewPassword
    }
  );
};
export const getUser = () => {
  const token = localStorage.getItem('jwt')
  if (token) {
    const user = decode(token);
    return user;
  } else {
    return null;
  }
}

export const jwtClear = () => {
  localStorage.removeItem('jwt');
  window.location = "/login";
}

