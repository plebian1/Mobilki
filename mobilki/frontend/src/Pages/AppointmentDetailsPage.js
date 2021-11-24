import React, { useEffect, useState } from 'react';
import useFetch from "use-http";
import ExamCheck from "./ExamCheck";

const AppointmentDetailsPage = ({appointmentId}) =>  {

    const [exams, setExams] = useState([]);
    const { post } = useFetch(
        'api/appointments/details/' + appointmentId,
        {
            headers: {
                userId: sessionStorage.getItem('userId'),
            },
            cachePolicy: 'no-cache',
        }
    );

    const { get, response } = useFetch(
        'api/diagnostics',
        {
            cachePolicy: 'no-cache',
        }
    );

    const getExams = async () =>  {
        const data = await get(""); 

        if (response.ok) {
            setExams(data);
            console.log(data)
        }
    };

    const addDetail = async (id) =>  {
        await post("", {
            appointmentId: appointmentId,
            examId: id
        }); 
    };

    function AvailableExams() {
        const availableExams =[]; 
        for(var i=0; i<exams.length; i++) {
            availableExams.push(<ExamCheck examId={exams[i].DiagnosticsTypesId} examName={exams[i].Name}></ExamCheck>);
        }
        return availableExams; 
    }

    function save () {
        const inputs = document.getElementsByClassName('form-check-input');
        for(var i=0; i<inputs.length; i++) {
            if(inputs[i].checked)
                addDetail(inputs[i].id);
        }
    }

    useEffect(() => {
        getExams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
    <div class="center">
        <h3 class="pt-24">Wybierz badania, które chcesz wykonać podczas wizyty</h3>
        <table class="table wd-350-500"><tbody>
        <AvailableExams></AvailableExams>
        </tbody></table>
        <div class="pt-24 pb-24">
        <a class="btn btn-primary" href="/home" role="button" onClick={save}>Potwierdź wybór badań</a>
        </div>
    </div>
    );
}
 
export default AppointmentDetailsPage;