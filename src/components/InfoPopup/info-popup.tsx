import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
type Props = {
  isOpen: boolean;
  title: string;
  type: "error" | "success";
  onClose: () => void;
};

export default function InfoPopup({ title, isOpen, type, onClose }: Props) {
  return (
    <div
      className={`relative z-10  ${isOpen ? "block" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4 text-center"
          onClick={onClose}
        >
          <div
            className={`relative transform rounded-radius-8 bg-[#D1F4D9] border border-primary-color text-left shadow-xl transition-all`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2" onClick={onClose}>
              <CloseIcon />
            </button>
            <div className="pt-[40px] pb-[20px] px-[40px]">
              <div className={"flex flex-col items-center gap-2"}>
                <div>
                  {type === "error" ? (
                    <CancelIcon fontSize="large" className="text-red-600" />
                  ) : (
                    <CheckCircleIcon
                      fontSize="large"
                      className="text-primary-color"
                    />
                  )}
                </div>
                <p className=" text-base text-primary-color leading-normal">
                  {title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
