import React from "react";
import { Link } from "react-router-dom";

function StudentItem(props) {
	const { id, name, phone, email, gender, address } = props.student;
	return (
		<tr>
			<td className="text-center">{+props.i + 1}</td>
			<td className="text-center">{id}</td>
			<td className="text-center">{name}</td>
			<td className="text-center">{gender}</td>
			<td className="text-center">{phone}</td>
			<td className="text-center">{address}</td>
			<td className="text-center">{email}</td>
			<td className="text-center">
				<Link className="btn btn-secondary me-3" to={"/detail/" + id}>
					Detail
				</Link>
				<button onClick={() => props.showModalDelete(props.student)} className="btn btn-secondary me-3">
					Delete
				</button>
			</td>
		</tr>
	);
}
export default StudentItem;
