interface SeekerProps {
  height?: string;
  left?: string;
}
export const Seeker = ({
  height = "h-[90%]",
  left = "left-0",
}: SeekerProps) => {
  return (
    <div
      id="seeker"
      className={`absolute z-10 flex flex-col items-center ${height} ${left}`}
    >
      <svg
        viewBox="0 0 10 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-seekerbackground"
        height={20}
      >
        <path
          d="M1.8 12H8.2C8.64183 12 9 11.6418 9 11.2V6.08964C9 5.90249 8.93439 5.72126 8.81458 5.57749L5 1L1.18542 5.57749C1.06561 5.72126 1 5.90249 1 6.08964V11.2C1 11.6418 1.35817 12 1.8 12Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.8"
        ></path>
      </svg>
      <div className="pt-1.25 w-0.5 bg-seekerbackground h-full" />
    </div>
  );
};
