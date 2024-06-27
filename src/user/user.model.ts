export type CreateUserModel = {
  username: string;
  bio: string;
  password: string;
  profile_pic_url: string;
  user_role: string;
};

export enum AccountStatus {
  Unknown = 0,
  Active = 1,
  Inactive = 2
}

export enum AccountStatusStringEnum {
  Unknown = 'unknown',
  Active = 'active',
  Inactive = 'inactive'
}

export type User = {
  id: string;
  username: string;
  bio: string;
  password: string;
  profile_pic_url: string;
  user_role: string;
  account_status: AccountStatusStringEnum;
};
