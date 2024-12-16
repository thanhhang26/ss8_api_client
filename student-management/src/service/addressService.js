import axios from "axios";
import { BASE_URL } from "./api";

export async function getAddressStudent() {
	try {
		const response = await axios.get(`${BASE_URL}/address`);
		return response.data;
	} catch (e) {
		return [];
	}
}
