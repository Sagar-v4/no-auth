import { TABS } from "@/registry/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import { TabsContent } from "@workspace/ui/components/tabs";

export default function Page() {
  return (
    <>
      <TabsContent value={TABS.ROLE.value} asChild>
        <div className="mx-auto p-2">
          <Card>
            <CardHeader>
              <CardTitle>{TABS.ROLE.title}</CardTitle>
              <CardDescription>
                Create role for organization users with different permissions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}
