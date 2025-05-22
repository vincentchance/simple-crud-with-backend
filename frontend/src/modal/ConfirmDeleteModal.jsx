import React from 'react';
import axiosInstance from '../../axios/axios';

const ConfirmDeleteModal = ({ handleClose, visible, selectedId }) => {
	if(!visible) return null;
	
	const deleteDataById = async (id) => {
		try {
			const response = await axiosInstance.delete(`/users/${id}`);
			handleClose();
		} catch(error) {
			console.log(error.message)
		}
	}
	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-50 h-screen flex justify-center items-center select-none">
			<div className="flex flex-col px-5 bg-white w-[30%] h-[8rem] rounded-lg justify-center shadow-md gap-7">
					<div>
						Are you sure, you want to delete it?
					</div>
					<div className="flex justify-end gap-5">
						<button className="bg-blue-400 rounded-lg px-2 py-1 text-white" onClick={()=>deleteDataById(selectedId)}>Delete</button>
						<button className="bg-red-400 rounded-lg px-2 py-1 text-white" onClick={handleClose}>Cancel</button>
					</div>
			</div>
		</div>
	);
}

export default ConfirmDeleteModal;