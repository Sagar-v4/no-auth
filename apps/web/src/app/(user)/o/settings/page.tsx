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
      <TabsContent value={TABS.SETTING.value} asChild>
        <div className="mx-auto p-2">
          <Card>
            <CardHeader>
              <CardTitle>{TABS.SETTING.title}</CardTitle>
              <CardDescription>
                Manage your workspace settings and preferences.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}
