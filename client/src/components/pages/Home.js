import React from 'react'
import Dashboard from '../layouts/Dashboard'
import Navigation from '../layouts/Navigation'

const Home = () => {
    return (
        <div>
            <Navigation greeting = "Welcome" />
            <Dashboard />
        </div>
    )
}

export default Home
