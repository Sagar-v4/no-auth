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
      <TabsContent value={TABS.DASHBOARD.value} asChild>
        <div className="mx-auto p-2">
          <Card>
            <CardHeader>
              <CardTitle>{TABS.DASHBOARD.title}</CardTitle>
              <CardDescription>Organization data</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </TabsContent>
    </>
  );
}
