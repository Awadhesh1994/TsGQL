import { Request, Response } from 'express';
import { redis } from '../redis';
import { User } from '../entity/User';


export const verificationEmail = async(req: Request, res: Response) => {
    const { id } = req.params;
    const userID = await redis.get(id);
    if(userID){
      await User.update({id: userID}, {confirmationEmail: true});
      await redis.del(id);
      res.send("SUCCESSFULLY VERIFIED !!");
    } else {
      res.send("SOME ERROR IN VERIFICATION !!");
    }
};