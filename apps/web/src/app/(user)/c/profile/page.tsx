"use client";

import { TABS } from "@/registry/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import { TabsContent } from "@workspace/ui/components/tabs";
import { useUser } from "@no-auth/next";

export default function Page() {
  const { user } = useUser();
  return (
    <>
      <TabsContent value={TABS.PROFILE.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.PROFILE.title}</CardTitle>
            <CardDescription>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
