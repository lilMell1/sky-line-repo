import { Request, Response } from 'express';
import { User } from '../models/User';  // Assuming User is your Mongoose model
import {IUser} from '../models/User'

// Get all tasks for a user
export const getUserTasks = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;

  try {
    const user:IUser = (await User.findById(userId))!;
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); //I set the server to respond with an HTTP 404 status, which represents "Not Found." that being sent to the FRONT
                                                                  // where the function has been called! 
    }
    res.status(200).json(user.tasks);  // Return the user's tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};