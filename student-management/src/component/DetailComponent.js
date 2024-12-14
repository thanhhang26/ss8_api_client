import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../service/informationService";

function DetailComponent() {
	const [studentDetail, setStudentDetail] = useState({ id: "", name: "", phone: "", email: "" });

	const { id } = useParams();
	useEffect(() => {
		const fetchData = async () => {
			const detail = await getStudentById(id);
			setStudentDetail(detail);
		};
		fetchData();
	}, [id]);
	return (
		<div className="container">
			<h3>Student Details</h3>
			<p>ID: {studentDetail.id}</p>
			<p>Name: {studentDetail.name}</p>
			<p>Phone: {studentDetail.phone}</p>
			<p>Email: {studentDetail.email}</p>
		</div>
	);
}
export default DetailComponent;
