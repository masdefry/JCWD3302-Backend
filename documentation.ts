/*
    ➡️ npm install bull ioredis

    ➡️ queues/transaction.queue.ts

    import Queue from "bull";
    import prisma from "../prisma";

    export const transactionQueue = new Queue("transaction-expiry", {
        redis: { host: "127.0.0.1", port: 6379 },
    });

    // Process job: update status expired
    transactionQueue.process(async (job) => {
    const { transactionId } = job.data;

    const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
    });

    if (transaction && transaction.status === "pending") {
        await prisma.transaction.update({
        where: { id: transactionId },
        data: { status: "expired" },
        });
        console.log(`Transaction ${transactionId} expired`);
    }
    });

    ➡️ services/transaction.service.ts

    import { transactionQueue } from "./queues/transactionQueue";
    import prisma from "./prisma";

    export async function createTransaction() {
        const expiryMs = 15 * 60 * 1000; // 15 menit

        const transaction = await prisma.transaction.create({
            data: {
            status: "pending",
            expiresAt: new Date(Date.now() + expiryMs),
            },
        });

        // Tambah job dengan delay
        await transactionQueue.add(
            { transactionId: transaction.id },
            { delay: expiryMs } // job jalan setelah 15 menit
        );

        return transaction;
    }

*/
