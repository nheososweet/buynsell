import { useEffect, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import IconError from "../Icon/error";
import "./style.scss";

interface Props {
  required?: boolean;
  name: string;
  control: Control<any>;
  placeholder?: string;
  label?: string;
}

function RichQuill({
  required = false,
  name,
  control,
  placeholder,
  label,
}: Props) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const quillRef = useRef<HTMLDivElement>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quillRef.current &&
        !quillRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, formState: { errors } }) => {
        return (
          <div ref={quillRef} className="flex flex-col gap-1" onClick={onFocus}>
            {label && (focused || field.value) && (
              <p className=" font-['SVN-Regular'] text-secondart text-size-base leading-[22px]">
                {label}
                {required && <span className="text-base-error ml-1">*</span>}
              </p>
            )}
            <ReactQuill
              id="quill"
              modules={modules}
              className={`${
                focused
                  ? "quill-focused"
                  : `quill-blur ${field.value ? "quill-has-value" : ""} ${
                      errors[name] ? "quill-error" : ""
                    }`
              }`}
              theme="snow"
              {...field}
              placeholder={placeholder || `Nhập ${label}`}
            />
            {errors[name] && (
              <div className="text-base-error text-size-sm font-medium font-[SVN-Regular] flex items-center gap-1">
                <IconError /> {errors[name]?.message as string}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

export default RichQuill;
