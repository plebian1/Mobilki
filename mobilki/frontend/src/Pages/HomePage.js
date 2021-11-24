import React, { useEffect, useState } from 'react';
import useFetch from "use-http";
import NewAppointmentDetails from "./NewAppointmentDetails";
import OldAppointmentDetails from "./OldAppointmentDetails";

const HomePage = () =>  {

    const [appointments, setAppointments] = useState([]);

    const [oldAppointments, setOldAppointments] = useState([]);
    const [newAppointments, setNewAppointments] = useState([]);

    const { get, response } = useFetch(
        'api/appointments/user',
        {
            headers: {
                userId: sessionStorage.getItem('userId'),
            },
            cachePolicy: 'no-cache',
        }
    );

    function OldAppointments() {

        const appointments = [];

        if(oldAppointments.length == 0)
            return (<p>Brak wcześniejszych wizyt</p>)

        for(var i=0; i<oldAppointments.length; i++) {
            appointments.push(<OldAppointmentDetails appointmentId={oldAppointments[i].AppointmentsId} appointmentDate={oldAppointments[i].Date}></OldAppointmentDetails>);
        }
        return appointments; 
    }

    function NewAppointments() {
        const appointments = [];

        if(newAppointments.length == 0)
            return (<p>Brak nadchodzących wizyt</p>)

        for(var i=0; i<newAppointments.length; i++) {
            appointments.push(<NewAppointmentDetails appointmentId={newAppointments[i].AppointmentsId} appointmentDate={newAppointments[i].Date}></NewAppointmentDetails>);
        }
        return appointments; 
    }

    const getAppointments = async () =>  {
        const data = await get("");

        if (response.ok) {
            setAppointments(data);
        }

        var newAppointmentsTemp = [];
        var oldAppointmentsTemp = [];
        
        for(var i=0; i<data.length; i++) {
            if(data[i].Date > new Date())
                newAppointmentsTemp.push(data[i])
            else
                oldAppointmentsTemp.push(data[i])
        }

        setNewAppointments(newAppointmentsTemp);
        setOldAppointments(oldAppointmentsTemp);
    };

    useEffect(() => {
        getAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []); 

    return (
    <div>
        <div class="wd-100-p sticky">
            <nav class="navbar navbar-dark bg-primary">
                <a class="navbar-brand text-center wd-100-p" href="/appointment">Umów wizytę w laboratorium</a>
            </nav>
        </div>

        <div class="center">
            <h4>Nadchodzące wizyty</h4>
            <table class="table wd-350">
                <tbody>
                <NewAppointments></NewAppointments>
                </tbody>
            </table>

            <h4>Wcześniejsze wizyty</h4>
            <table class="table wd-350">
                <tbody>
                <OldAppointments></OldAppointments>
                </tbody>
            </table>
        </div>
    </div>
    );
}
 
export default HomePage;