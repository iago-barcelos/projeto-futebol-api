const validLoginMock = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const invalidLoginMock = {
  email: "@user.com",
  password: "secret_user"
}

const validUserAtDb = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: "secret_admin"
}

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDgxODI4NDV9.Nkk3ofFME8qBLi6F-MB03d4qZMMSbij61XZVqU9C8CE"

export default {
  validLoginMock,
  invalidLoginMock,
  tokenMock,
  validUserAtDb,
}