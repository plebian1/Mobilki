const ExamCheck = ({examId, examName}) =>  {

      return (
        <tr>
        <td class="wd-60"><input id={examId} class="form-check-input" type="checkbox" value=""/></td>
        <td class="text-left"><label class="form-check-label">{examName}</label></td>
        </tr>
      );
  }
   
export default ExamCheck;