import jsPDF from "jspdf";
import Navbar from "./Navbar";
import ResultDetails from "./ResultDetails";
const ResultsDetailsPage = ({id}) =>  {

    const appointmentResults = ["1","2","3"]; 
    function Results() {
        const results = [];

        for(var i=0; i<appointmentResults.length; i++) {
            results.push(<ResultDetails examName={i} examResult={i+1}></ResultDetails>);
        }
        return results; 
    }

    function save() {
        var doc = new jsPDF('p', 'pt', 'a4');
        doc.html(document.querySelector('#results'), {
          callback: function (doc) {
            doc.save('wyniki.pdf');
          },
          margin: [30, 30, 30, 30],
          x: 32,
          y: 32,
        });
      }

    return (
        <div>
        <Navbar></Navbar>
        <div class="center">
        <h4>Wyniki</h4>
        <table id="results" class="table wd-350"><tbody>
        <Results></Results>
        </tbody></table>
        <button type="submit" class="btn btn-primary" onClick={save}>Eksportuj wyniki do pliku pdf</button>
        </div>

        </div>
    );
}
 
export default ResultsDetailsPage;