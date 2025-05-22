import User from "../models/userModels.js";

export const getUsers = async(req, res) => {
	try {
		const { page = 1, limit = 5 } = req.query; // 1  sebagai default
		
		const users = await User.findAll({
			limit: parseInt(limit),
			offset: parseInt((page - 1) * limit)
		}); //set a limit data in the array
		
		const totalUser = await User.count();
		
		 
		res.status(200).json({ users, totalPage: Math.ceil(totalUser / limit), currentPage: parseInt(page) }); //all data based here
	} catch (error){
		res.status(500).json({ message: "No data"});
	}
}

export const getUserById = async(req, res) => {
	try {
		const response = await User.findOne({
			where: {
				id: req.params.id //id berbasarkan request
			}
		}); //retrieve all data abaut user from user table
		res.status(200).json(response);
	} catch (error){
		res.status(400).json({ message: "Users is not available "});
	}
}


export const createUser = async(req, res) => {
	try {
		const { name, email, gender } = req.body;
		
		await User.create({ name, email, gender });
		//send data based req.body
		res.status(201).json({ message: "data successfully created" });
	} catch (error){
		res.status(400).json({ message: error.message });
	}
}

export const updateUserById = async(req, res) => {
	try {
		const { name, email, gender } = req.body;
		
		await User.update({ name, email, gender }, {
			where: {
				id: req.params.id
			}
		});
		//send updated data through req body
		res.status(200).json({ message: "data successfully updated" });
	} catch (error){
		res.status(400).json({ message: error.message })
	}
}

export const deleteUserById = async(req, res) => {
	try {
		await User.destroy({
			where: {
				id: req.params.id
			}
		});
		res.status(204).json({ message: "data successfully deleted" });
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}