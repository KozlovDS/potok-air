import React from "react";
import { Title } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  videoLink: string;
}

const Video: React.FC<Props> = ({ className, videoLink }) => {
  return (
    <>
      <div className={cn(className, "")}>
        <Title size="h2" className="mb-4" text="Видеообзор" />
        <video controls className="rounded-2xl w-full">
          <source src={`${videoLink}#t=1`} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </>
  );
};

export default Video;
