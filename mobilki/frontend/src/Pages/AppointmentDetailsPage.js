import ExamCheck from "./ExamCheck";
const AppointmentDetailsPage = () =>  {

    const exams = [
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia",
        "OB",
        "Morflogoia"
    ]

    function AvailableExams() {
        const availableExams =[]; 
        for(var i=0; i<exams.length; i++) {
            availableExams.push(<ExamCheck examId={i} examName={exams[i]}></ExamCheck>);
        }
        return availableExams; 
    }

    function save () {
        const inputs = document.getElementsByClassName('form-check-input');
        for(var i=0; i<inputs.length; i++) {
            if(inputs[i].checked)
                console.log("post" + inputs[i].id);
        }
    }

    return (
    <div class="center">
        <h3 class="pt-24">Wybierz badania, które chcesz wykonać podczas wizyty</h3>
        <table class="table wd-350"><tbody>
        <AvailableExams></AvailableExams>
        </tbody></table>
        <div class="pt-24 pb-24">
        <a class="btn btn-primary" href="/home" role="button" onClick={save}>Potwierdź wybór badań</a>
        </div>
    </div>
    );
}
 
export default AppointmentDetailsPage;