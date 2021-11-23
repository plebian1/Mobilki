import NewAppointmentDetails from "./NewAppointmentDetails";
import OldAppointmentDetails from "./OldAppointmentDetails";
const HomePage = () =>  {

    const oldAppointments = ["1", "2", "3"]; 
    const newAppointments = ["1", "2", "3","1", "2", "3","1", "2", "3","1", "2", "3","1", "2", "3","1", "2", "3","1", "2", "3"];

    function OldAppointments() {

        const appointments = [];

        if(oldAppointments.length == 0)
            return (<p>Brak wcześniejszych wizyt</p>)

        for(var i=0; i<oldAppointments.length; i++) {
            appointments.push(<OldAppointmentDetails appointmentId={i} appointmentDate={new Date(i,i,i)}></OldAppointmentDetails>);
        }
        return appointments; 
    }

    function NewAppointments() {
        const appointments = [];

        if(newAppointments.length == 0)
            return (<p>Brak nadchodzących wizyt</p>)

        for(var i=0; i<newAppointments.length; i++) {
            appointments.push(<NewAppointmentDetails appointmentId={i} appointmentDate={new Date(i,i,i)}></NewAppointmentDetails>);
        }
        return appointments; 
    }

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