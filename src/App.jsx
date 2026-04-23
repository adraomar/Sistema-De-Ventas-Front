import './App.css'
import UserContext from './context/UserContext.jsx'
import RouteMap from './routes/RouteMap'

function App() {
    return (
        <UserContext>
            <RouteMap/>
        </UserContext> 
    )
}

export default App
