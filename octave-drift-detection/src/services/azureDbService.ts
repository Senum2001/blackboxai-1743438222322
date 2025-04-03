import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
const tableName = process.env.AZURE_TABLE_NAME || "OctaveData";

const credential = new AzureNamedKeyCredential(accountName, accountKey);
const tableClient = new TableClient(
  `https://${accountName}.table.core.windows.net`,
  tableName,
  credential
);

export async function getDashboardData(mode: string) {
  try {
    const entities = [];
    for await (const entity of tableClient.listEntities()) {
      if (entity.partitionKey === mode) {
        entities.push(entity);
      }
    }
    return entities;
  } catch (error) {
    console.error("Error fetching data from Azure Table:", error);
    return [];
  }
}

export async function getKPIs(mode: string) {
  return getDashboardData(`${mode}-kpis`);
}

export async function getErrorData(mode: string) {
  return getDashboardData(`${mode}-errors`);
}