import { toast } from "react-toastify";

export function copyToClipboard(text: string): void {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Đã sao chép thành công: ", text);
      toast.success("Đã sao chép!", {
        autoClose: 1500,
      });
    })
    .catch((err) => {
      console.error("Lỗi khi sao chép: ", err);
    });
}
