
export type UserRole = 'user' | 'admin';
export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}