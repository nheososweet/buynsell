import "./style.scss";
function Spinner() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/15 z-[9999999999999]">
      <span className="loader"></span>
    </div>
  );
}

export default Spinner;
