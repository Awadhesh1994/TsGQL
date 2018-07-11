import { v4 } from "uuid";
import { Redis } from "ioredis";

export const conformationOfEmailId = async (
  url: string,
  userId: string,
  redis: Redis,
) => {
  const id = v4();
  await redis.set(id, userId , "ex", 60 * 60 * 1);
  return `${url}/confirm/${id}`;
};
