export type ITHead = {
  label: string;
  position: "left" | "right" | "center";
  key: string;
  additionClass?: string;
  subkeyAdditionClass?: string;
  subKey?: string;
};

type Props = {
  data: ITHead[];
  handleSelectedAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSelectedAll?: boolean;
  disabled?: boolean;
};

const TableHead = ({
  data,
  handleSelectedAll,
  isSelectedAll,
  disabled,
}: Props) => {
  return (
    <thead className="">
      <tr>
        {data.map(({ label, position, key, additionClass }) => (
          <th
            key={label + "-" + key}
            className={`z-[2] bg-grey-f6f8 sticky top-0 text text-size-medium font-['SVN-SemiBold'] leading-5 text-first-black py-[12px] px-[26px] ${additionClass} text-${position}`}
          >
            {key === "checkbox" ? (
              <input
                className="w-[14px] h-[14px] accent-login-button"
                type="checkbox"
                onChange={(e) => {
                  handleSelectedAll && handleSelectedAll(e);
                }}
                checked={isSelectedAll}
                disabled={disabled}
              />
            ) : (
              label
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
