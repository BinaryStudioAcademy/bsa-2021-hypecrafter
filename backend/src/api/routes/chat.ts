import MicroMq from 'micromq';
import { Services } from '../../services';

const init = ({ chatService }: Services, path: string) => (app: MicroMq) => app
  .post(
    `${path}/new-message`,
    async (req, res) => {
      const newMessage = await chatService.createMessage(req.body);

      res.json({
        server: {
          action: '/chat/new-message',
          meta: newMessage,
        },
      });
      return newMessage;
    }
  );

export default init;
