import { TabsContent } from "@workspace/ui/components/tabs";
import { getKeys } from "@/registry/fake-data";
import { TABS } from "@/registry/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";

export default function Page() {
  const keys = getKeys();
  return (
    <>
      <TabsContent value={TABS.KEY.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.KEY.title}</CardTitle>
            <CardDescription>
              Name, Domain, Description etc details.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
