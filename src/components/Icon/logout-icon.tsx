type Props = { className?: string };

const LogoutIcon = ({ className }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.5 1.5C1.22386 1.5 1 1.72386 1 2V6.8C1 8.18071 2.11929 9.3 3.5 9.3H13.2929L9.94645 12.6464C9.75118 12.8417 9.75118 13.1583 9.94645 13.3536C10.1417 13.5488 10.4583 13.5488 10.6536 13.3536L14.8536 9.15355C15.0488 8.95829 15.0488 8.64171 14.8536 8.44645L10.8536 4.44645C10.6583 4.25118 10.3417 4.25118 10.1464 4.44645C9.95118 4.64171 9.95118 4.95829 10.1464 5.15355L13.2929 8.3H3.5C2.67157 8.3 2 7.62843 2 6.8V2C2 1.72386 1.77614 1.5 1.5 1.5Z"
        fill="#9D0404"
        className={className}
      />
    </svg>
  );
};

export default LogoutIcon;
