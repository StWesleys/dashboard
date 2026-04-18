export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  }
}