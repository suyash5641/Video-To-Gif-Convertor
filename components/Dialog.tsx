import * as React from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useAbortControllerContext } from "./AbortProvider";

interface CircularProgressProps {
  progress: number;
}

export function DialogBox({ progress }: CircularProgressProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const { abortUpload } = useAbortControllerContext();

  const cancelUpload = () => {
    abortUpload();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="p-4 absolute top-10 left-1/2 -translate-x-1/2 translate-y-0">
        <DialogHeader>
          <DialogTitle>Video Upload</DialogTitle>
        </DialogHeader>
        <Progress value={progress} />
        <div className="mt-4 flex justify-center items-center flex-wrap space-x-2 gap-4">
          <p className="text-sm text-gray">{`Uploading : ${progress}%`}</p>
          <Button variant="destructive" onClick={cancelUpload}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
