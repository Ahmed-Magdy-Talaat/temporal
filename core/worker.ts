import { NativeConnection, Worker } from "@temporalio/worker";
import { orderProcessingWorkflow } from "./workflow";
import * as activities from "./activities";

async function run() {
  const connection = await NativeConnection.connect({
    address: "localhost:7233", // Point to the Temporal server
  });

  const worker = await Worker.create({
    workflowsPath: require.resolve("./wrokflow.ts"),
    activities,
    taskQueue: "order-processing",
    connection: connection,
  });

  await worker.run();
}

export default {
  run,
};
