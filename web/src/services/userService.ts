import type { User, UsersResponse } from "../types/user";

const API_URL = 'http://localhost:3000/users';

export async function getUsers(
  params: {
    page?: number;
    limit?: number;
    search?: string;
  } = {},
): Promise<UsersResponse> {
  const { page = 1, limit = 10, search = '' } = params;

  const url = new URL(API_URL);

  url.searchParams.append('page', String(page));
  url.searchParams.append('limit', String(limit));
  if (search) url.searchParams.append('search', search);

  const response = await fetch(url);

  if(!response.ok){
    throw new Error('Erro ao buscar usuários');
  }

  return response.json();
}

export async function createUser(data: {
  name: string;
  email: string;
}): Promise<User> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok){
      throw new Error('Erro ao criar usuário')
    }

    return response.json();
}