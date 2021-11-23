const NewAppointmentDetails = ({appointmentId, appointmentDate}) =>  {

    return (
    <tr>
    <td class="text-left"><p>{appointmentDate.toLocaleDateString()}</p></td>
    </tr>
    );
}
 
export default NewAppointmentDetails;