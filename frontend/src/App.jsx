import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import InsertDataModal from './modal/InsertDataModal.jsx';
import EditDataModal from './modal/EditDataModal.jsx';
import axiosInstance from '../axios/axios';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal.jsx'

function App() {
	const[Users, setUsers] = useState([]);
	//show modal
	const[PostModal, setPostModal] = useState(false);
	const[EditModal, setEditModal] = useState(false);
	//dropdown
	const[isDropdownIdOpen, setIsDropdownIdOpen] = useState(null);
	const[selectedUserID, setSelectedUserID] = useState(null);
	const[showDeleteModal, setShowDeleteModal] = useState(false);
	
	//pagination
	const[currentPage, setCurrentPage] = useState(1);
	const[totalPage, setTotalPage] = useState(1)
	const dropdownRef = useRef(null); // awali dengan null useRef
	
	const toggleDropdown = (id) => {
		setIsDropdownIdOpen(isDropdownIdOpen === id ? null : id);
	}
	
	const handleClickOutside = (event) => {
		if( dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownIdOpen(null)
		}
	}
	
	async function getUserdata(page, limit){
		try {
			const response = await axiosInstance.get('/users', {
				params: {
					page,
					limit
				}
			});
			setUsers(response.data.users);
			setCurrentPage(response.data.currentPage);
			setTotalPage(response.data.totalPage);
			
			console.log("Data imported successfully ");
			console.log(response.data);
		}catch (error){
			console.error("Data error: " + error);
		}
	}
	const changePage = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPage) {
		  setCurrentPage(pageNumber);
		  getUserdata(pageNumber, 5);
		}
	}
	

	useEffect(() => {
		getUserdata();
	}, []);
	
	
	useEffect(() => {
		getUserdata();
	}, [PostModal, showDeleteModal, EditModal]);
	
	useEffect(() => {
	  document.addEventListener('mousedown', handleClickOutside);
	  return () => {
		document.removeEventListener('mousedown', handleClickOutside);
	  };
	}, []);
	
  return (
    <>
      <div>
			<Navbar />
			<div className="w-full flex bg-white py-3 px-20 justify-end">
				<button 
					className="bg-blue-500 px-5 py-2 rounded-lg text-white"
					onClick={()=> setPostModal(true)}>
					Tambahkan data
				</button>
			</div>
			<div className="flex items-center justify-center py-2">
				<table className="table-auto w-full sm:max-w-md md:max-w-xl lg:max-w-4xl border-collapse">
					<thead>
						<tr>
							<th className=" px-2 py-2 border-2 border-solid border-slate-600">name</th>
							<th className=" px-2 py-2 border-2 border-solid border-slate-600">email</th>
							<th className=" px-2 py-2 border-2 border-solid border-slate-600">gender</th>
							<th className=" px-2 py-2 border-2 border-solid border-slate-600">Action</th>
						</tr>
					</thead>
					<tbody>
						{Users.map( user => (
							<tr key={user.id}>
								<td className="px-5 py-5 border-2 border-solid border-slate-600">{user.name}</td>
								<td className="px-5 py-5 border-2 border-solid border-slate-600">{user.email}</td>
								<td className="px-5 py-5 border-2 border-solid border-slate-600">{user.gender}</td>
								<td className="px-5 py-5 border-2 border-solid border-slate-600">
									<div className="flex justify-center items-center" >
										<button
										  onClick={() => toggleDropdown(user.id)}>
										  <svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-6 w-6"
										  >
											<path
											  strokeLinecap="round"
											  strokeLinejoin="round"
											  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
											/>
										  </svg>
										</button>
										
										{/*dropdown menu */}
											{isDropdownIdOpen === user.id && (
												<div className="absolute right-44 z-30 w-20 mt-2 bg-white shadow-lg rounded-md border-2 border-solid border-slate-500 text-center" ref={dropdownRef} >
													<ul>
														<li className="cursor-pointer hover:bg-gray-200" 
															onClick={() => {
																setEditModal(true);
																setIsDropdownIdOpen(null);
																setSelectedUserID(user.id);
															}}>Edit</li>
														<li className="cursor-pointer hover:bg-gray-200" 
															onClick={() => {
																setShowDeleteModal(true);
																setSelectedUserID(user.id);
														}}>Delete</li>
													</ul>
												</div>
											)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>	
			</div>
			<div className="flex justify-center items-center gap-5 mt-5">
				<button className={`page ${currentPage <= totalPage ? "bg-blue-300" : "bg-blue-400" }`} onClick={() => changePage(currentPage - 1)} disabled={currentPage < totalPage}>previous</button>
				<span>Page {currentPage} of {totalPage}</span>
				<button className={`page ${currentPage <= totalPage ? "bg-blue-300" : "bg-blue-400" }`} onClick={() => changePage(currentPage + 1)} disabled={currentPage > totalPage}>next</button>
			</div>
			<EditDataModal handleClose={() => setEditModal(false)} visible={EditModal} selectedId={selectedUserID}/>
			<InsertDataModal handleClose={()=> setPostModal(false)} visible={PostModal}/>
			<ConfirmDeleteModal handleClose={() => setShowDeleteModal(false)} visible={showDeleteModal} selectedId={selectedUserID}/>
	  </div>
    </>
  )
}

export default App


