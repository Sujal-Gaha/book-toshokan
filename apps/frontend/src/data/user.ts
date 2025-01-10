import { TLoginUserInput, TRegisterUserInput } from "../contracts/user/schema";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export const registerUser = async (body: TRegisterUserInput) => {
  const response = await fetch(`${BACKEND_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const loginUser = async (body: TLoginUserInput) => {
  const response = await fetch(`${BACKEND_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
