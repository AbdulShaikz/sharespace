import {Header, Footer} from "./components";
import {Outlet} from "react-router-dom";

function App() {
  return (
<div className="min-h-screen flex flex-wrap content-between bg-black">
      <div className="w-full block text-[#fcfffe]">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      </div>      
    </div>
  )
}

export default App
