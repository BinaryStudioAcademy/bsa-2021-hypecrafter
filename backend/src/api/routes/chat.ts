import MicroMq from "micromq";
import { Services } from "../../services";

const init =
  ({ chatService }: Services, path: string) =>
  (app: MicroMq) =>
    app
      .post(`${path}/new-message`, async (req, res) => {
        const newMessage = await chatService.createMessage(req.body);

        res.json({
          server: {
            action: "/chat/new-message",
            meta: newMessage,
          },
        });
        return newMessage;
      })
      .get(`${path}/messages`, async (req: any, res: any) => {
        const allMessages = [123123123];
        console.log(req);
        console.log("//////////////////////////////////////");
        console.log(allMessages);
        res.json({
          server: {
            action: "/chat/messages",
            meta: allMessages,
          },
        });
      });

export default init;
