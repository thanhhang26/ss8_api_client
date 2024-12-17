import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addNewStudent } from "../service/studentService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getAddressStudent } from "../service/addressService";
import { toast } from "react-toastify";

function AddComponent() {
	const [student, setStudent] = useState({ id: "", name: "", gender: "", address: "", phone: "", email: "" });
	const [addressStudent, setAddressStudent] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const list = await getAddressStudent();
			setAddressStudent(list);
		};
		fetchData();
	});
	const navigate = useNavigate();
	const handleSubmit = async (value) => {
		console.log(value);
		//Chuyển từ chuỗi xử lý option ở dưới thành đối tượng. Phải sử dụng JSON.parse() không thì dữ liệu sẽ thành dạng chuỗi như này {\"id\":1,\"name\":\"Ha Noi\"}. JSON.parse() có tác dụng chuyển từ dạng chuỗi sang đối tượng.
		const student = {
			...value,
			address: JSON.parse(value.address),
		};
		await addNewStudent(student);
		toast.success("Thêm mới thành công");
		navigate("/students_list");
	};

	const handleValidate = Yup.object({
		id: Yup.string().required("ID không được để trống").min(1, "Phải là số nguyên dương"),
		name: Yup.string()
			.required("Tên không được để trống")
			.matches(/^[A-ZÀ-Ỹ[a-zà-ỹ]*(\s[A-ZÀ-Ỹ[a-zà-ỹ]*)+$/, "Tên không đúng định dạng"), //^[A-ZÀ-Ỹ]: Tên bắt đầu bằng một chữ cái viết hoa, bao gồm cả các ký tự có dấu như À, Á, Â, Ă, Đ, Ê, Ô, Ơ, Ư,...
		phone: Yup.string()
			.required("Số điện thoại không được để trống")
			.matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
		email: Yup.string()
			.required("Email không được để trống")
			.min(1, "Phải là số nguyên dương")
			.matches(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email không hợp lệ"),
		//^[a-zA-Z]:Tên tài khoản email có thể bắt đầu bằng bất kỳ chữ cái nào (viết hoa hoặc thường).
		//[a-zA-Z0-9._%+-]*:Cho phép các ký tự hợp lệ trong phần tên tài khoản email (chữ cái, số, dấu gạch dưới _, dấu chấm ., dấu cộng +, hoặc dấu gạch ngang -).
		//{2,}: Phần mở rộng phải đảm bảo có 2 kí tự
	});
	return (
		<div className="container">
			<h3>Add New Student</h3>
			<Formik initialValues={student} onSubmit={handleSubmit} validationSchema={handleValidate}>
				<Form className="mt-3">
					<div className="row  mb-3 ms-1 align-items-center">
						<label className="col-sm-1">ID:</label>
						<div className="col-sm-4">
							<Field type="text" name="id" className="form-control" placeholder="Enter your id" />
							<ErrorMessage name="id" style={{ color: "red" }} component="div" />
						</div>
					</div>
					<div className="row  mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Name:</label>
						<div className="col-sm-4">
							<Field type="text" name="name" className="form-control" placeholder="Enter your name" />
							<ErrorMessage name="name" style={{ color: "red" }} component="div" />
						</div>
					</div>

					<div className="row  mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Gender:</label>
						<div className="col-sm-4">
							<div>
								<div className="form-check form-check-inline">
									<Field className="form-check-input" type="radio" name="gender" value="male" />
									<label className="form-check-label">Male</label>
								</div>
								<div className="form-check form-check-inline">
									<Field className="form-check-input" type="radio" name="gender" value="female" />
									<label className="form-check-label">Female</label>
								</div>
							</div>
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Phone:</label>
						<div className="col-sm-4">
							<Field type="text" name="phone" className="form-control" placeholder="Enter your phone" />
							<ErrorMessage name="phone" style={{ color: "red" }} component="div" />
						</div>
					</div>

					<div className="row  mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Address:</label>
						<div className="col-sm-4">
							<Field as="select" name="address" className="form-select">
								<option value={""}>City</option>
								{addressStudent.map((a) => (
									<option value={JSON.stringify(a)}>{a.name}</option>
									//phải chuyển dữ liệu sang dạng chuỗi bằng cách JSON.stringify()
								))}
							</Field>
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Email:</label>
						<div className="col-sm-4">
							<Field type="email" name="email" className="form-control" placeholder="Enter your email" />
							<ErrorMessage name="email" style={{ color: "red" }} component="div" />
						</div>
					</div>
					<button type="submit" className="btn btn-secondary btn-sm mb-3 ms-2">
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
}
export default AddComponent;
