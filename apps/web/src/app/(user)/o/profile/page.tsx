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
      <TabsContent value={TABS.PROFILE.value} asChild>
        <Card>
          <CardHeader>
            <CardTitle>{TABS.PROFILE.title}</CardTitle>
            <CardDescription>
              Name, Domain, Description etc details.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
