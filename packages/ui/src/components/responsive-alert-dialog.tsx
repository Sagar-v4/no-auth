import * as React from "react";

import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@workspace/ui/components/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@workspace/ui/components/drawer";
import { Button } from "@workspace/ui/components/button";

export function ResponsiveAlertDialog({
  title,
  trigger,
  onConfirm,
  description,
}: Readonly<{
  title: React.JSX.Element;
  trigger: React.JSX.Element;
  onConfirm: () => Promise<void>;
  description?: React.JSX.Element;
}>) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent className="w-fit min-w-md lg:min-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="max-w-96 overflow-hidden text-nowrap text-ellipsis">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="max-h-48 overflow-scroll text-justify text-wrap">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-w-full">
        <DrawerHeader className="text-center">
          <DrawerTitle className="overflow-hidden text-nowrap text-ellipsis">
            {title}
          </DrawerTitle>
          <DrawerDescription className="max-h-48 overflow-scroll text-wrap">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Button onClick={onConfirm} data-slot="drawer-close">
            Confirm
          </Button>
          <DrawerClose className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center border px-4 shadow-xs has-[>svg]:px-3">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
