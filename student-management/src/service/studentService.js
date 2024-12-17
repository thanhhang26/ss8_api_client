import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllStudent() {
	try {
		const response = await axios.get(`${BASE_URL}/students?_expand=address`);
		console.log(response);
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function addNewStudent(student) {
	try {
		const response = await axios.post(`${BASE_URL}/students`, student);
		return response.data;
	} catch (e) {}
}

export async function searchByName(name) {
	try {
		const response = await axios.get(`${BASE_URL}/students?name=${name}`);
		//?name=${name} là chuỗi truy vấn trong URL, trong đó name là tham số tìm kiếm mà bạn muốn gửi tới server để lọc sinh viên theo tên.
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function getStudentById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/students/${id}`);
		return response.data;
	} catch (e) {
		return null;
	}
}

export async function deleteStudentById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/students/${id}`);
		return response.data;
	} catch (e) {
		return null;
	}
}
