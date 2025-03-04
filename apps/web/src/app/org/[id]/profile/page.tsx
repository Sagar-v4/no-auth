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
      <TabsContent value="profile" asChild>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Name, Domain, Description etc details.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
}
