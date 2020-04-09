export interface IUser extends IUserDocument {
  _id: string;
}

export interface IUserDocument {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  imageURL?: string;
  provider: 'mail' | 'gmail';
  isVerified: boolean;
}
