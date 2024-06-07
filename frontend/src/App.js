import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginComponent/loginPage";
import TodosDisplay from "./components/todosDisplay/todosDisplay";
import CreateTodoForm from "./components/createTodo/createTodoform";
import UpdateTodoForm from "./components/updateTodo/updateTodoForm";
import RegisterPage from "./components/registerComponent/registerPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<TodosDisplay />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateTodoForm />} />
          <Route path="/update/:id" element={<UpdateTodoForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
