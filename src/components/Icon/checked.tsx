type Props = {
  additionClass?: string
};

const IconChecked = ({additionClass}: Props) => {
  return (
    <svg
      className={`${additionClass}`}
      width={8}
      height={6}
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3L2.29289 4.29289C2.68342 4.68342 3.31658 4.68342 3.70711 4.29289L7 1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconChecked;
