import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import UpdateRestaurantPage from './pages/UpdateRestaurantPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage/>}/>
				<Route path='/restaurants/:id' element={<RestaurantPage/>} />
				<Route path='/restaurants/:id/update' element={<UpdateRestaurantPage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
