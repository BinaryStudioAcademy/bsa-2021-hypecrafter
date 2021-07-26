/* eslint-disable  @typescript-eslint/no-explicit-any */
import MicroMq from 'micromq';
import userService from './services/user';

const app = new MicroMq({
  name: 'backend',
  rabbit: {
    url: process.env.RABBIT_URL || 'amqp://localhost',
  },
});

app.get('/api/users', async (_:any, res:any) => {
  const users = await userService.getAll();
  res.json(users);
});

app.get('/api/users/error', async (_:any, res:any) => {
  res.json({ message: 'ERROR!!!!'});
});

app.get('/api/users/:id', async (req:any, res:any) => {
  const user = await userService.getById(req.params.id);
  res.json(user);
});

app.start();