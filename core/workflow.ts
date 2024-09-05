import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities";

const activitiesProxy = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export async function orderProcessingWorkflow(orderId: string) {
  console.log(`Processing order ${orderId}`);
  await activitiesProxy.verifyInventory(orderId);
  await activitiesProxy.chargePayment(orderId);
  await activitiesProxy.shipOrder(orderId);
  console.log(`Order ${orderId} processed successfully`);
}
