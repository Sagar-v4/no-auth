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
      <TabsContent value="settings" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Organization settings like owner, status etc.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
