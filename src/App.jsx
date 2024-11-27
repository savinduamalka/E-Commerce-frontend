import { BrowserRouter,  Route,  Routes,  } from "react-router-dom"
import HomePage from "./pages/homePage"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Contact from "./pages/contact"


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
