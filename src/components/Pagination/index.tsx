import IconCarretDown from "../Icon/carret-down";

function Pagination() {
  return (
    <div className="py-8">
      <div className="flex items-center">
        <span>25</span>
        <span>
          <IconCarretDown />
        </span>
      </div>
    </div>
  );
}

export default Pagination;
