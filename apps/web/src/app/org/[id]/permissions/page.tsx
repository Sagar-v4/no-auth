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
      <TabsContent value="permissions" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>
              Create permission for organization users(clienteles) and combine
              with role.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
