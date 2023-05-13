import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const main = async () => {
  const tasks = ['起きる', '朝ごはん食べる', '犬の散歩'].map((title) => db.task.create({ data: { title } }));
  await Promise.allSettled(tasks);
};

main();
