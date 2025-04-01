import Dialog from "@/components/Dialog";

type Props = {
  additionClass?: string;
  isOpen: boolean;
  title: string;
  subTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  width?: number;
  children?: React.ReactNode;
};

function ConfirmActionPopup({
  isOpen,
  subTitle,
  title,
  onCancel,
  onConfirm,
  additionClass,
  children,
}: Props) {
  const onSubmit = async () => {
    onConfirm();
    handleClose();
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <Dialog
      title={title}
      subTitle={subTitle}
      isOpen={isOpen}
      onClose={handleClose}
      actionButtonCancel={handleClose}
      actionButtonConfirm={onSubmit}
      additionClass={additionClass}
    >
      {children}
    </Dialog>
  );
}

export default ConfirmActionPopup;
