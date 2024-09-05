import { Client, Connection } from "@temporalio/client";
import { orderProcessingWorkflow } from "./core/workflow";
import worker from "./core/worker";

async function handleContentTypeCreated(contentTypeId: string) {
  const client = new Client({
    connection: await Connection.connect({
      address: "localhost:7233", // Temporal server address
    }),
  });

  await worker.run();
  const handle = await client.workflow.start(orderProcessingWorkflow, {
    taskQueue: "order-processing",
    workflowId: `order-${contentTypeId}-${Date.now()}`,
    args: [contentTypeId],
  });

  console.log(`Started workflow ${handle.workflowId}`);
}

handleContentTypeCreated("1234");
