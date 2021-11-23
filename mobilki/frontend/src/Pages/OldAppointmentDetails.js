const OldAppointmentDetails = ({appointmentId, appointmentDate}) =>  {

    return (
      <tr>
      <td class="text-left"><p>{appointmentDate.toLocaleDateString()}</p></td>
      <td><a href={"/results/" + appointmentId}>Zobacz wyniki</a></td>
      </tr>
    );
}
 
export default OldAppointmentDetails;