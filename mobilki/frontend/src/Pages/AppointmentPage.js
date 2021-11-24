import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import React, { useState } from "react";
import { useHistory } from "react-router";
import useFetch from "use-http";
import Navbar from './Navbar';

const AppointmentPage = () =>  {
  
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setselectedTime] = useState(new Date(0, 0, 0, 8));
  const [appointmentId, setAppointmentId] = useState();

  const {post, response } = useFetch(
      'api/appointments/new_appointment',
      {
          headers: {
              userId: sessionStorage.getItem('userId'),
          },
          cachePolicy: 'no-cache',
      }
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
    setselectedTime(date);
  };
  
  const addAppointment = async () => {

    await post("", {
      date: selectedDate.toLocaleDateString(),
      time: selectedTime.getHours() + ":" + selectedTime.getMinutes()
    }).then((res) => {
      if (response.ok) {
        setAppointmentId(res.result.id);
        history.pushState()
      }});
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
          <a class="btn btn-primary" href={"/appointment/details/" + appointmentId} role="button" onClick={addAppointment}>Potwierdź termin wizyty</a>
        </div>
      </div>
    </div>
  );
}
 
export default AppointmentPage;