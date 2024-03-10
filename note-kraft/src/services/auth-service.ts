import { UserLoginDTO } from "notekraft/types/dtos/user-dto";

/**
 * Handles Login user
 * @param email
 * @param password
 */
export async function loginUser(
  email: string,
  password: string
): Promise<UserLoginDTO> {
  try {
    const url = `${process.env.BACKEND_URL}/user/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const userJson = (await response.json()) as UserLoginDTO;
    return userJson;
  } catch (error) {
    throw new Error("Failed to login server");
  }
}
