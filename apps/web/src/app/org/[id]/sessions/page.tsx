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
      <TabsContent value="user" asChild>
        <Card>
          <CardHeader>
            <CardTitle>User</CardTitle>
            <CardDescription>Find user sessions by user uuid.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="device" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Device</CardTitle>
            <CardDescription>
              Find user sessions by device uuid.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
