import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/manageProducts/Dashboard'

function ManageProductRoutes() {
    return (
        <Routes>
            <Route index element={<Dashboard />}></Route>
        </Routes>
    )
}

export default ManageProductRoutes