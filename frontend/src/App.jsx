import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import EditTask from "./pages/EditTask.jsx"
import Header from "./components/Header.jsx"
import AddTask from "./pages/AddTask.jsx"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/edit/:id" element={<EditTask/>}/>
        <Route path="/add" element={<AddTask/>}/>
      </Routes>
    </div>
  )
}

export default App
