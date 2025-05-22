import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Navbar from './components/Navbar.jsx';
import InsertData from './modal/InsertDataModal.jsx';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';

createRoot(document.getElementById('root')).render(
  <StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path={"/"} element={<App />}></Route>
			<Route path={"/insertDataModal"} element={<InsertData />}></Route>
			<Route path={"/confirmDelete"} element={<ConfirmDeleteModal />}></Route>
		</Routes>
	</BrowserRouter>
  </StrictMode>,
)
