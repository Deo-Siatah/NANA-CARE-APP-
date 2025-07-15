import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExploreWorkersPage";
import WorkerProfilePage from "@/pages/WorkerProfilePage";
import RegisterWorkerForm from "@/pages/WorkerRegistrationPage";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/explore" element={<ExplorePage/>}/>
          <Route path="/worker/:userId" element={<WorkerProfilePage/>}/>
          <Route path="/workerprofile" element={<RegisterWorkerForm/>}/>
        </Routes>
      </Router>
  )   
}

export default App
