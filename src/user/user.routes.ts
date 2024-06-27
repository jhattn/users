import UserController from './user.controller';

const userRoutes = [
  {
    method: 'get',
    path: '/users',
    handler: UserController.getAllUsers
  },
  {
    method: 'get',
    path: '/profile/:id',
    handler: UserController.getUserById
  },
  {
    method: 'put',
    path: '/profile/:id',
    handler: UserController.updateUser
  },
  {
    method: 'del',
    path: '/profile/:id',
    handler: UserController.deleteUser
  },
  {
    method: 'post',
    path: '/signup',
    handler: UserController.createUser
  },
  {
    method: 'post',
    path: '/login',
    handler: UserController.loginUser
  },
  {
    method: 'post',
    path: '/forgot-password',
    handler: UserController.forgotPassword
  },
  {
    method: 'put',
    path: '/verify-email',
    handler: UserController.verifyEmail
  },
  {
    method: 'put',
    path: '/update-profile-pic',
    handler: UserController.updateProfilePic
  },
  {
    method: 'post',
    path: '/logout',
    handler: UserController.logoutUser
  }
];

export default userRoutes;
