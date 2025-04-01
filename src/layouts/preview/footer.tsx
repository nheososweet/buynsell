type Props = {};

const MasterFooter = ({}: Props) => {
  return (
    <div className="items-center justify-between fixed w-full bottom-0 h-[64px] text-white bg-black-1f px-[72px] py-4 text-size-medium font-['SVN-Regular'] flex gap-3 border-t-[1px] border-purple-500">
      <span>@Copyright Trung tâm Mã số, Mã vạch Quốc gia</span>
      <span className="">Version 1.0</span>
    </div>
  );
};

export default MasterFooter;
