import { Post } from "../types/Post";
import { User } from "../types/User";

const BASE__URL = 'https://jsonplaceholder.typicode.com';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE__URL + url)
    .then(res => res.json());
}

export const getUsers = () => getData<User[]>(`/users`);

export const getUserPosts = (userId: number) => getData<Post[]>(`/posts?userId=${userId}`);
