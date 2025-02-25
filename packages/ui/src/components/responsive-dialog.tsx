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
  title: string;
  trigger: React.JSX.Element;
  children: React.ReactNode;
  description?: string;
}>) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="w-fit min-w-md lg:min-w-lg">
          <DialogHeader>
            <DialogTitle className="max-w-96 text-nowrap overflow-hidden text-ellipsis">
              {title}
            </DialogTitle>
            <DialogDescription className="max-h-20 text-justify text-wrap overflow-scroll">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="p-1 pt-0 max-h-48 lg:max-h-96 overflow-auto">
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
          <DrawerTitle className="text-nowrap overflow-hidden text-ellipsis">
            {title}
          </DrawerTitle>
          <DrawerDescription className="max-h-40 text-wrap overflow-scroll">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0 overflow-scroll">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
