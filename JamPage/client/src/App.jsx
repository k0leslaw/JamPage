import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import MediaPage from './pages/MediaPage/MediaPage.jsx';
import IdeasPage from './pages/IdeasPage/IdeasPage.jsx';
import SchedulePage from './pages/SchedulePage/SchedulePage.jsx';
import JoinPage from './pages/JoinPage/JoinPage.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <DashboardPage /> }></Route>
          <Route path='/media' element={ <MediaPage /> }></Route>
          <Route path='/ideas' element={ <IdeasPage /> }></Route>
          <Route path='/schedule' element={ <SchedulePage /> }></Route>
          <Route path='/join' element={ <JoinPage /> }></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
