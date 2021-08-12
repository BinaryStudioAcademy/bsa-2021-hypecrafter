import MicroMq from "micromq";
import { Services } from "../../services";
import { wrap } from "../../helpers";

interface registerReqBody {
  data: {
    region: string;
    phoneNumber: string;
    gender: string;
    birthday: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  tokens: {
    accessToken: string;
    RefreshToken: string;
  };
}

const init =
  ({ userService }: Services, path: string) =>
  (app: MicroMq) => {
    return app.post(
      path,
      wrap<
        Empty,
        { accessToken: string; RefreshToken: string },
        registerReqBody,
        Empty
      >(async (req) => {
        const user = await userService.createUser(req.body.data);
        if (user) {
          return {
            result: req.body.tokens as {
              accessToken: string;
              RefreshToken: string;
            },
          };
        } else {
          return { statusCode: 500 };
        }
      })
    );
  };

export default init;
