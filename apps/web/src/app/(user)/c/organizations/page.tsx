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
      <TabsContent value={TABS.ORGANIZATION.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.ORGANIZATION.title}</CardTitle>
            <CardDescription>
              Name, Domain, Description etc details.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
