
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  Input,
} from "../../ui";

interface ImageInputProps {
  iconImage?: React.ReactNode;
  [key: string]: any;
}

export const ImageInput = ({
  iconImage,
  label = "ເລືອກຮູບພາບ",
  ...props
}: ImageInputProps) => {
  const displayImage = props.value ?? "";
  const typeOf = typeof displayImage
  const [preview, setPreview] = useState(displayImage);
  useEffect(() => {
    if (typeOf === "string") {
      setPreview(props.value);
    }
  }, [props.value]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : undefined;
    const displayUrl = file ? URL.createObjectURL(file) : "";
    setPreview(displayUrl);
    if (props.onChange && file) {
      props.onChange(file);
    } else if (props.onChange) {
      props.onChange(undefined);
    }
  };

  return (
    <div className="">
      <label
        className={cn(
          "border-4 border-dashed w-full h-96 group text-center hover:border-blue-500 focus-within:border-blue-500 transition-all duration-300 ease-in-out cursor-pointer",
          props.className,
        )}
      >
        {preview && (

          <Image
            src={preview ?? "/fallback.jpg"}
            alt="Preview image"
            className={cn(
              "object-cover w-full h-full p-2",
              props?.className,
            )}
            width={props.width ?? 1000}
            height={props.height ?? 500}
          />
        )}
        {!preview && (
          <div className="flex flex-col items-center justify-center h-full">
            {iconImage || <ImagePlus />}
            <p className="text-sm text-gray-500">
              <span className="text-blue-600 transition-colors duration-200 ease-in-out hover:text-blue-800 focus:text-blue-800">
                {label ?? "ເລືອກຮູບພາບ"}
              </span>
            </p>
          </div>
        )}
        <Input
          type="file"
          className="hidden"
          {...props.rest}
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
