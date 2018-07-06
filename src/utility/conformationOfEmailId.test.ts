
import { Connection } from 'typeorm';
import * as Redis from 'ioredis';
import fetch from "node-fetch";
import { conformationOfEmailId } from "./conformationOfEmailId";
import { createTypeOrmConnection } from "./typeOrmConnection";
import { User } from "../entity/User";

let userId = "";
const redis = new Redis();

let conn: Connection;

beforeAll(async () => {
    await createTypeOrmConnection();
    const user = await User.create({
        username: "awadhesh",
        email: "awadhesh31dec@gmail.com",
        password: "awadhesh"
    }).save();
    userId = user.id;
});

afterAll(async () => {
    conn.close();
})

test("You have successfully confirm your email id !!", async () => {
    const url = await conformationOfEmailId(
        process.env.TEST_HOST as string,
        userId,
        redis
    );
    const response = await fetch(url);
    const text = await response.text();
    console.log(text);
    expect(text).toEqual("SUCCESSFULLY VERIFIED !!");
    const users = await User.findOne({ where: { id: userId } });
    expect((users as User).confirmationEmail).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
});