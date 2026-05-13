export interface LoginPostResponse {
  token: string;
  user: {
    id: string;
    account: string;
    email: string;
    status: boolean;
    createdAt: string; 
    updatedAt: string; 
  };
}