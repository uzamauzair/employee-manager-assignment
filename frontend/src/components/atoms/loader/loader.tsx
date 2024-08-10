import React from "react";
import { LoaderIcon } from "lucide-react";

export function Loader(props: { background?: boolean }) {
  if (props.background) {
    return (
      <div className="bg-slate-500 flex h-screen flex-col items-center justify-center">
        <LoaderIcon className="animate-spin" color="white" />
      </div>
    );
  }

  return <LoaderIcon className="animate-spin" />;
}
