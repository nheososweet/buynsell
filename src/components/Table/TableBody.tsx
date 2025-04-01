import { ITHead } from "./TableHead";

type Props = {
  data: { [key: string]: React.ReactNode | string }[];
  list_head: ITHead[];
  totalRow?: React.ReactNode;
  noDataText?: string;
};

const TableBody = ({
  data,
  list_head,
  totalRow,
  noDataText = "Không có dữ liệu",
}: Props) => {
  const renderColumnsByRow = (obj: {
    [key: string]: React.ReactNode | string;
  }) => {
    return list_head.map(
      ({ key, subKey, position, additionClass, subkeyAdditionClass }, idx) => {
        if (obj.hasOwnProperty(key)) {
          return (
            <td
              key={key + "-" + idx}
              className={`text-size-medium font-['SVN-Regular'] leading-5 text-first-black py-[12px] px-[26px] !text-${position} ${additionClass}`}
              style={{ textAlign: position }}
            >
              {obj[key]}
              {subKey && (
                <p
                  className={`text-size-subkey-table leading-5 ${subkeyAdditionClass}`}
                >
                  {obj[subKey]}
                </p>
              )}
            </td>
          );
        }
        return (
          <td key={key + "-" + idx} style={{ textAlign: position }}>
            Không có
          </td>
        );
      }
    );
  };

  return (
    <tbody>
      {data.length > 0 ? (
        <>
          {totalRow && totalRow}
          {data.map((obj: { [key: string]: React.ReactNode | string }, idx) => (
            <tr
              key={idx}
              className="text-size-medium font-['SVN-Regular'] border-b-2 border-b-grey-f6 leading-5 text-first-black py-[12px] px-[26px]"
            >
              {renderColumnsByRow(obj)}
            </tr>
          ))}
        </>
      ) : (
        <tr>
          <td
            colSpan={list_head.length}
            className="text-center text-size-medium font-['SVN-Regular'] leading-5 text-secondary py-[2rem]"
          >
            {noDataText}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
