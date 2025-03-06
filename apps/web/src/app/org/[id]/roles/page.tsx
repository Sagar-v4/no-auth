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
      <TabsContent value="roles" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>
              Create role for organization users(clienteles) with different
              permissions.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
