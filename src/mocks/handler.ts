// src/mocks/handlers.ts
import { RestRequest, RestContext, rest, setupWorker } from "msw";
import db from "./db/index";

const generateJsonResponse =
  (data: any, statusCode = 200) =>
  (req: RestRequest, res: any, ctx: RestContext) => {
    return res(ctx.status(statusCode), ctx.json(data));
  };

const handlers = [rest.get("/api/users", generateJsonResponse(db.user))];

// 除了创建一个 Mock Service Worker 实例外，还会自动启动该实例，并在运行时配置浏览器的 Service Worker，本质上是对 createServer 的一种封装
export const worker = setupWorker(...handlers);
// 一定要记得跑 npx msw init public
