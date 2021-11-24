const NewAppointmentDetails = ({appointmentId, appointmentDate, appointmentTime }) =>  {

    return (
    <tr>
    <td class="text-left"><p>{appointmentDate} {appointmentTime}</p></td>
    </tr>
    );
}
 
export default NewAppointmentDetails;