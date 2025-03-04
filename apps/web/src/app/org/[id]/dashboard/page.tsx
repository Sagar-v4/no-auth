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
      <TabsContent value="dashboard" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Quick detail of whats happening in organization and status.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
