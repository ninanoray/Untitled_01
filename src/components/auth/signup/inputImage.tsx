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
          <FormLabel className="cursor-pointer rounded-full">
            <Avatar className="size-32">
              <AvatarImage src={preview} />
              <AvatarFallback className="text-gray-500 hover:text-black trans-200">
                사진 추가
              </AvatarFallback>
            </Avatar>
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
