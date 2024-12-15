"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CropIcon, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

interface Props {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  aspect?: number;
  children: ReactNode;
}

const ImageCrop = ({ image, setImage, aspect, children }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [crop, setCrop] = useState<Crop>();
  const [url, setUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>();

  // Helper function to center the crop
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ): Crop {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 100,
          height: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const onCropComplete = useCallback((crop: PixelCrop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setUrl(croppedImageUrl);
    }
  }, []);

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    return canvas.toDataURL("image/png", 1.0);
  }

  function onCrop() {
    setImage(url);
    setDialogOpen(false);
  }

  // 초기화
  useEffect(() => {
    if (image) setPreview(image);
  }, [image]);

  return (
    <Dialog
      open={preview === image && dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        setCrop(undefined);
        setPreview(undefined);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[80vw] p-0 gap-0">
        <div className="justify-self-center p-12 pb-0">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => {
              setCrop(percentCrop);
            }}
            onComplete={(crop) => {
              onCropComplete(crop);
            }}
            aspect={aspect}
          >
            <Avatar>
              <AvatarImage
                ref={imgRef}
                className="max-h-[75vh] object-cover object-center"
                alt="image preview"
                src={preview}
                sizes="50vw"
                onLoad={onImageLoad}
              />
              <AvatarFallback className="min-h-[460px]">
                Loading...
              </AvatarFallback>
            </Avatar>
          </ReactCrop>
        </div>
        <DialogFooter className="p-3">
          <Button type="submit" size={"sm"} className="w-fit" onClick={onCrop}>
            <CropIcon className="mr-1.5 size-4" />
            자르기
          </Button>
          <DialogClose asChild>
            <Button
              size={"sm"}
              type="reset"
              className="w-fit"
              variant={"outline"}
              onClick={() => {
                setImage("");
              }}
            >
              <Trash2Icon className="mr-1.5 size-4" />
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCrop;
