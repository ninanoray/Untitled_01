import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

type Props = {
  control:
    | Control<{
        name: string;
        password: string;
        image?: any;
      }>
    | undefined;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
};

const InputImage = ({ control, preview, setPreview }: Props) => {
  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }

  return (
    <FormField
      control={control}
      name="image"
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem className="mt-10 mb-8 flex-center flex-col">
          <FormLabel className="flex-center flex-col gap-4 cursor-pointer">
            <Avatar className="size-32">
              <AvatarImage src={preview} />
              <AvatarFallback>기본</AvatarFallback>
            </Avatar>
            <p className="text-gray-400 text-xl">사진 추가</p>
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const { files, displayUrl } = getImageData(event);
                setPreview(displayUrl);
                onChange(files[0]);
              }}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputImage;
