import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./component/HeaderComponent";
import StudentList from "./component/StudentList";
import HomeComponent from "./component/HomeComponent";
import FooterComponent from "./component/FooterComponent";
import AddComponent from "./component/AddComponent";
import DetailComponent from "./component/DetailComponent";

function App() {
	return (
		<>
			<HeaderComponent />
			<Routes>
				<Route path={"/home"} element={<HomeComponent />}></Route>
				<Route path={"/students_list"} element={<StudentList />}></Route>
				<Route path={"/students_list/add_students"} element={<AddComponent />}></Route>
				<Route path={"/detail/:id"} element={<DetailComponent />}></Route>
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
