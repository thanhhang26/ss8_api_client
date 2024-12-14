import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteStudentById } from "../service/informationService";
function DeleteComponent(props) {
	const handleClose = async () => {
		await props.closeModal();
	};

	const handleDelete = async () => {
		try {
			// Đảm bảo rằng student.id tồn tại trước khi gọi delete
			if (props.student?.id) {
				await deleteStudentById(props.student.id);
				handleClose();
			} else {
				console.error("kHÔNG CÓ ID");
			}
		} catch (error) {
			return [];
		}
	};
	return (
		<>
			<Modal show={props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có muốn xoá sinh viên{" "}
					<strong>
						{props.student?.id} - {props.student?.name}
					</strong>{" "}
					không?
				</Modal.Body>
				{/*  Thẻ <strong> được dùng để làm nổi bật nội dung văn bản.
				props.student?.email kiểm tra an toàn trước khi truy cập email (đề phòng trường hợp props.student không được truyền vào).
				Dấu ?. là Optional Chaining trong JavaScript/React, đảm bảo rằng:
                Nếu props.student không tồn tại hoặc là undefined, chương trình sẽ không bị lỗi mà chỉ trả về undefined cho toàn bộ biểu thức.
                Nếu props.student tồn tại và có thuộc tính name, giá trị của name sẽ được hiển thị.
				 */}
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default DeleteComponent;
