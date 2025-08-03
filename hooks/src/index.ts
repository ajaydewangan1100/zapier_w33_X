import express from "express";
import { PrismaClient } from "../prisma/generated/prisma";

const client = new PrismaClient();

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  await client.$transaction(async (tx) => {
    // store in DB a new trigger
    const run = await client.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    // add in outboxRun show sweeper will push it on a queue(KAFKA)
    await client.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({ success: true, message: `Webhook Received` });
});

app.listen(PORT, () => {
  console.log("running on : http://localhost:" + PORT);
});
