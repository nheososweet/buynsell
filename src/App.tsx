import { BrowserRouter } from "react-router-dom"; // Không cần useNavigate ở đây
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./fonts/SVN-GILROY-BLACK-ITALIC.OTF";
// ... các import fonts khác
import { LoadingState, useAppLoading } from "./global-states/loading.state";
import RouteList from "./routers";
import { ApiProvider } from "./contexts/APIContext";

function App() {
  const app_loading = useAppLoading((state: LoadingState) => state.app_loading);

  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <RouteList />
          <ToastContainer />
          {app_loading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/20 z-[9999999999999]">
              <div className="w-10 h-10 border-[6px] border-dashed rounded-full animate-spin border-primary-color z-[99999999999999]"></div>
            </div>
          )}
        </ApiProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
