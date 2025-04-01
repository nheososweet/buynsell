import ReactLoading from "react-loading";

function LoadingPage() {
  return (
    <div className="app-loading text-[50px] text-white !w-[100vw] !h-[100vh] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center !bg-black z-[999] opacity-50">
      {/* <span>Loading</span> */}
      <ReactLoading type="bubbles" width={300} height={300} color="#FFFFFF" />
    </div>
  );
}

export default LoadingPage;
