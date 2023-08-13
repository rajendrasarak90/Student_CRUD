import StudentPage from "./StudentPage";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8000";
// console.log(process.env.REACT_APP_BASE_URL);

function App() {
  return (
    <div>
      <StudentPage />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
