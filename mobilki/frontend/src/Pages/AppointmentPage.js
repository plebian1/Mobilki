import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { useState } from "react";
import Navbar from './Navbar';

const AppointmentPage = () =>  {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setselectedTime] = useState(new Date(0, 0, 0, 8));
  const [appointment, setAppointment] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
        setselectedTime(date);
  };
  
  function add() {
    setAppointment(1);
    console.log("post" + selectedDate + selectedTime);
  }
  
  return (
    <div>
    <Navbar></Navbar>
  <div class="center">
    <h3>Wybierz termin wizyty</h3>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div class="pt-24">
      <DatePicker
        label="Data wizyty"
        value={selectedDate}
        onChange={handleDateChange}
        format="MM/dd/yyyy"
        />
        </div>
      <div class="pt-24">
      <TimePicker
        label="Godzina wizyty"
        value={selectedTime}
        onChange={handleTimeChange}
        minutesStep={15}
        ampm={false}
        />
        </div>
    </MuiPickersUtilsProvider>

    <div class="pt-24">
    <a class="btn btn-primary" href={"/appointment/details/" + appointment} role="button" onClick={add}>Potwierdź termin wizyty</a>
    </div>
  </div>
  </div>
  );
}
 
export default AppointmentPage;