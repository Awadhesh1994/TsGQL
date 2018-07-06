
import fetch from "node-fetch";

test("You have already confirm your email id !!", async () => {
    const response = await fetch(`${process.env.TEST_HOST}/confirm/ddwad2w2wd-22w2`);
    const text = await response.text();
    console.log(text);
    expect(text).toEqual("SOME ERROR IN VERIFICATION !!");

});