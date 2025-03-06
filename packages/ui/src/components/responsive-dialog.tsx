import * as React from "react";

import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";

export function ResponsiveDialog({
  title,
  trigger,
  children,
  description,
}: Readonly<{
  title: React.ReactNode;
  trigger: React.JSX.Element;
  children: React.ReactNode;
  description?: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="w-fit min-w-md lg:min-w-lg">
          <DialogHeader>
            <DialogTitle className="max-w-96 overflow-hidden text-nowrap text-ellipsis">
              {title}
            </DialogTitle>
            <DialogDescription className="max-h-20 overflow-scroll text-justify text-wrap">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-48 overflow-auto p-1 pt-0 lg:max-h-96">
            {children}
          </div>
        </DialogContent>
      </Dialog>
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
          <DrawerDescription className="max-h-40 overflow-scroll text-wrap">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-scroll p-4 pt-0">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
