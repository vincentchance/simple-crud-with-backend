import React from 'react';
import axiosInstance from '../../axios/axios';
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const insertDataSchema = z.object({
	name: z.string().min(3, "nama minimal 3 karakter"),
	email: z.string().email("Format email tidak valid").nonempty("E-mail is required"),
	gender: z.string().nonempty("gender is required")
})

const InsertDataModal = ({ handleClose, visible }) => {
	if(!visible) return null;
	
	const { control, handleSubmit } = useForm({
		defaultValues: {
			name: '',
			email: '',
			gender: ''
		},
		resolver: zodResolver(insertDataSchema)
	});
	
	async function postIDdata(data){
		try {
			const response = await axiosInstance.post('/users', data );
			console.log(response);
			handleClose();
		} catch (error) {
			console.log(error.message);
		}
	}
	
	return (
		<div className="fixed inset-0 flex bg-gray-500 bg-opacity-50  h-screen items-center justify-center select-none">
		
		<div className="flex flex-col bg-white rounded-lg shadow-md px-14 py-5 min-w-[30%] gap-5 mt-[-6rem] "> 
			<div className="font-bold text-center text-2xl">Tambahkan data</div>
			<form onSubmit={handleSubmit(postIDdata)}>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col">
						<label>Name :</label>
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<>
									<input
										{...field}
										className={`py-2 px-3 border-2 rounded-lg ${ fieldState.error ? 
										"border-red-500" : "border-gray-200" }`}	
										placeholder="contoh: Budi, lala"	
									/>
									{ fieldState.error && (
										<p className="text-red-500 mt-1 text-[12px]">{fieldState.error.message}</p>
									)}
								</>
							)}
						/>
						
					</div>
					<div className="flex flex-col">
						<label>E-mail :</label>
						<Controller 
							name="email"
							control={control}
							render={({ field, fieldState }) => (
								<>
									<input
										{...field}
										className={`py-2 px-3 border-2  rounded-lg ${ fieldState.error ? "border-red-500" : "border-gray-200" } `}
										placeholder="email@hotmail.com"
									/>
									{ fieldState.error && (
										<p className="text-red-500 mt-1 text-[12px]">{fieldState.error.message}</p>
									)}
								</>
							)}
						/>
						
					</div>
					<div className="flex flex-col gap-2">
						<label>Gender</label>
						<Controller 
							name="gender"
							control={control}
							render={({ field, fieldState }) => (
								<>
									<select
										{...field}
										className={` py-2 px-3 border-2 rounded-lg ${ fieldState.error ? "border-red-500" : "border-gray-200"}`}
									>
										<option value="">Select gender</option>
										<option value="male">male</option>
										<option value="female">female</option>
									</select>
									{ fieldState.error && (
										<p className="text-red-500 mt-1 text-[12px]">{fieldState.error.message}</p>
									)}
								</>
							)}
						/>
					</div>
					<div className="flex justify-end pt-2 gap-3 mt-2">
						<button type="submit" className="bg-blue-500 px-5 py-2 text-white rounded-lg">Submit</button>
						<button onClick={handleClose} className="bg-red-600 px-5 py-2 text-white rounded-lg">close</button>
					</div>
				</div>
			</form>
		</div>
		
	</div>
	)
}

export default InsertDataModal;