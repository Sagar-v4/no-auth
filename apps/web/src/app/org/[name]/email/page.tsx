import { z } from "zod";

import { DataTable as TemplateDataTable } from "@/components/email-template-data-table/data-table";
import { columns as templateColumns } from "@/components/email-template-data-table/columns";
import { templateSchema } from "@/components/email-template-data-table/schema";
import { DataTable as AppDataTable } from "@/components/email-app-data-table/data-table";
import { columns as appColumns } from "@/components/email-app-data-table/columns";
import { appSchema } from "@/components/email-app-data-table/schema";
import { TabsContent } from "@workspace/ui/components/tabs";
import { randomUUID } from "crypto";

async function getApps() {
  const apps = [
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 1",
        email: "test1@example.com",
      },
      name: "Test Email app 1",
      description: "Test description 1",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 2",
        email: "test2@example.com",
      },
      name: "Test Email app 2",
      description: "Test description 2",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 3",
        email: "test3@example.com",
      },
      name: "Test Email app 3",
      description: "Test description 3",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 4",
        email: "test4@example.com",
      },
      name: "Test Email app 4",
      description: "Test description 4",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 5",
        email: "test5@example.com",
      },
      name: "Test Email app 5",
      description: "Test description 5",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 6",
        email: "test6@example.com",
      },
      name: "Test Email app 6",
      description: "Test description 6",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 7",
        email: "test7@example.com",
      },
      name: "Test Email app 7",
      description: "Test description 7",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 8",
        email: "test8@example.com",
      },
      name: "Test Email app 8",
      description: "Test description 8",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 9",
        email: "test9@example.com",
      },
      name: "Test Email app 9",
      description: "Test description 9",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 10",
        email: "test10@example.com",
      },
      name: "Test Email app 10",
      description: "Test description 10",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 11",
        email: "test11@example.com",
      },
      name: "Test Email app 11",
      description: "Test description 11",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 12",
        email: "test12@example.com",
      },
      name: "Test Email app 12",
      description: "Test description 12",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 13",
        email: "test13@example.com",
      },
      name: "Test Email app 13",
      description: "Test description 13",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 14",
        email: "test14@example.com",
      },
      name: "Test Email app 14",
      description: "Test description 14",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 15",
        email: "test15@example.com",
      },
      name: "Test Email app 15",
      description: "Test description 15",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 16",
        email: "test16@example.com",
      },
      name: "Test Email app 16",
      description: "Test description 16",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 17",
        email: "test17@example.com",
      },
      name: "Test Email app 17",
      description: "Test description 17",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 18",
        email: "test18@example.com",
      },
      name: "Test Email app 18",
      description: "Test description 18",
      type: "Node Mailer",
      status: "Blocked",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 19",
        email: "test19@example.com",
      },
      name: "Test Email app 19",
      description: "Test description 19",
      type: "Node Mailer",
      status: "Active",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 20",
        email: "test20@example.com",
      },
      name: "Test Email app 20",
      description: "Test description 20",
      type: "Node Mailer",
      status: "Blocked",
    },
  ];

  return z.array(appSchema).parse(apps);
}

async function getTemplates() {
  const templates = [
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 1",
        email: "test1@example.com",
      },
      name: "Test Email template 1",
      description: "Test description 1",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 2",
        email: "test2@example.com",
      },
      name: "Test Email template 2",
      description: "Test description 2",
      type: "OTP",
      status: "Organiz",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 3",
        email: "test3@example.com",
      },
      name: "Test Email template 3",
      description: "Test description 3",
      type: "OTP",
      status: "Live",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 4",
        email: "test4@example.com",
      },
      name: "Test Email template 4",
      description: "Test description 4",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 5",
        email: "test5@example.com",
      },
      name: "Test Email template 5",
      description: "Test description 5",
      type: "OTP",
      status: "Organiz",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 6",
        email: "test6@example.com",
      },
      name: "Test Email template 6",
      description: "Test description 6",
      type: "OTP",
      status: "Live",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 7",
        email: "test7@example.com",
      },
      name: "Test Email template 7",
      description: "Test description 7",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 8",
        email: "test8@example.com",
      },
      name: "Test Email template 8",
      description: "Test description 8",
      type: "OTP",
      status: "Organiz",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 9",
        email: "test9@example.com",
      },
      name: "Test Email template 9",
      description: "Test description 9",
      type: "OTP",
      status: "Live",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 10",
        email: "test10@example.com",
      },
      name: "Test Email template 10",
      description: "Test description 10",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 11",
        email: "test11@example.com",
      },
      name: "Test Email template 11",
      description: "Test description 11",
      type: "OTP",
      status: "Organiz",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 12",
        email: "test12@example.com",
      },
      name: "Test Email template 12",
      description: "Test description 12",
      type: "OTP",
      status: "Live",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 13",
        email: "test13@example.com",
      },
      name: "Test Email template 13",
      description: "Test description 13",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 14",
        email: "test14@example.com",
      },
      name: "Test Email template 14",
      description: "Test description 14",
      type: "OTP",
      status: "Organiz",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 15",
        email: "test15@example.com",
      },
      name: "Test Email template 15",
      description: "Test description 15",
      type: "OTP",
      status: "Live",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 16",
        email: "test16@example.com",
      },
      name: "Test Email template 16",
      description: "Test description 16",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 17",
        email: "test17@example.com",
      },
      name: "Test Email template 17",
      description: "Test description 17",
      type: "OTP",
      status: "Organiz",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 18",
        email: "test18@example.com",
      },
      name: "Test Email template 18",
      description: "Test description 18",
      type: "OTP",
      status: "Live",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 19",
        email: "test19@example.com",
      },
      name: "Test Email template 19",
      description: "Test description 19",
      type: "OTP",
      status: "Personal",
    },
    {
      _id: randomUUID(),
      uuid: randomUUID(),
      client: {
        name: "Test User 20",
        email: "test20@example.com",
      },
      name: "Test Email template 20",
      description: "Test description 20",
      type: "OTP",
      status: "Organiz",
    },
  ];

  return z.array(templateSchema).parse(templates);
}

export default async function Page() {
  const apps = await getApps();
  const templates = await getTemplates();
  return (
    <>
      <TabsContent value="app" asChild>
        <AppDataTable data={apps} columns={appColumns} />
      </TabsContent>

      <TabsContent value="template" asChild>
        <TemplateDataTable data={templates} columns={templateColumns} />
      </TabsContent>
    </>
  );
}
