import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import Recorder from '../../components/Recorder/Recorder';
import HelpButton from '../../components/HelpButton/HelpButton';

import './DashboardPage.css'

function DashboardPage () {
    const [band, setBand] = useState('Choose Band');
    const [recordings, setRecordings] = useState([]);
    const [recentFilter, setRecentFilter] = useState(null);

    const loadRecordings = async (filter=null) => {
        const res = await fetch(filter ? `/ideas?band=${filter}` : '/ideas');
        const data = await res.json();

        setRecordings(data);
    }

    const formatDate = ({date}) => {
        const formatter = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' });
        return formatter.format(date);
    }

    useEffect( () => {
        loadRecordings(recentFilter)
    }, [recentFilter]);

    return (
        <div className='dashboard-page'>
            <NavBar pageTitle='Dashboard'/>
            <hr/>
            <div className='dash-body'>
                <div className='dash-body-left'>
                    <h3>Recent</h3>
                    <select onChange={e => setRecentFilter(e.target.value === 'All Bands' ? null : e.target.value)}>
                        <option>All Bands</option>
                        <option>Caamp</option>
                        <option>Mt. Joy</option>
                    </select>
                    <br/>
                    <table>
                        <tbody>
                            { recordings.map((recording, i) => (<tr key={i}><td><b>{recording.title}</b> was uploaded to <b>{recording.band}</b></td> <td  className='recentDate'><b>{ formatDate(recording.date)}</b></td></tr>)) }
                        </tbody>
                    </table>
                    <vr/>
                </div>
                <div className='dash-body-mid'>
                    <div>
                        <select onChange={ e => setBand(e.target.value) }>
                            <option>Choose Band</option>
                            <option>Caamp</option>
                            <option>Mt. Joy</option>
                        </select>
                        <HelpButton />
                    </div>
                    <Recorder band={ band } loadRecordings={ loadRecordings }/>
                    <Link to='/ideas'>See all Ideas</Link>
                </div>
                <div className='dash-body-right'>
                    <h3>Upcoming</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><b>Practice</b> with <b>Caamp</b> on <b>05/09</b>.</td>
                            </tr>
                            <tr>
                                <td><b>Practice</b> with <b>Mt. Joy</b> on <b>05/11</b>.</td>
                            </tr>
                            <tr>
                                <td><b>Show</b> with <b>Caamp</b> on <b>05/12</b>.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;