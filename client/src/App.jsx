import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExploreWorkersPage";
import WorkerProfilePage from "@/pages/WorkerProfilePage";
import RegisterWorkerForm from "@/pages/WorkerRegistrationPage";
import {Toaster} from "sonner";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";


function App() {
  return (
      <Router>
         <Toaster richColors position="top-center" />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/explore" element={<ExplorePage/>}/>
          <Route path="/worker/:userId" element={<WorkerProfilePage/>}/>
          <Route path="/workerprofile" element={<RegisterWorkerForm/>}/>
          
        </Routes>
      </Router>
  )   
}

export default App
