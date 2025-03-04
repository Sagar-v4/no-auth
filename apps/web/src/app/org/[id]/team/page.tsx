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
      <TabsContent value="members" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>Organization members.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="permissions" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>
              Organization members permission states what member has access.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
