const ResultDetails = ({examName, examResult}) =>  {

    return (
      <tr>
      <td class="text-left"><p>{examName}</p></td>
      <td class="text-left"><p>{examResult}</p></td>
      </tr>
    );
}
 
export default ResultDetails;