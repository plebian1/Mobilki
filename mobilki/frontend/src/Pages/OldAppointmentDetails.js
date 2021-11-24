const OldAppointmentDetails = ({appointmentId, appointmentDate, appointmentTime}) =>  {

    return (
      <tr>
      <td class="text-left"><p>{appointmentDate} {appointmentTime}</p></td>
      <td><a href={"/results/" + appointmentId}>Zobacz wyniki</a></td>
      </tr>
    );
}
 
export default OldAppointmentDetails;