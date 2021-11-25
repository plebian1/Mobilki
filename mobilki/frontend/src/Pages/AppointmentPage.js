import pl from "date-fns/locale/pl";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import useFetch from "use-http";
import Navbar from './Navbar';

const AppointmentPage = () =>  {
  
  const history = useHistory();

  // const excludeTimes = [new Date(0,0,0).setHours(8,30,0), new Date(0,0,0).setHours(9,30,0)];
  var now  = new Date();
  now.setDate(now.getDate() + 1)
  now.setHours(8);
  now.setMinutes(0);
  now.setSeconds(0);
  
  const [selectedDate, setSelectedDate] = useState(now);
  const [selectedTime, setselectedTime] = useState(now);
  const [appointmentId, setAppointmentId] = useState();
  const [excludeTimes, setExcludeTimes] = useState([]);

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
    setselectedTime(date);
  };


  const filterDays = (date) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
        return false;
    } else {
        return true;
    }
}
  
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
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd/MM/yyyy hh:mm"
            locale={pl}
            minDate={now}
            minTime={new Date().setHours(8,0,0)}
            maxTime={new Date().setHours(12,0,0)}
            excludeTimes={excludeTimes}
            timeIntervals={10}
            timeFormat="hh:mm"
            timeCaption="Godzina"
            filterDate={filterDays}
        />
        <div class="pt-24">
          <a class="btn btn-primary" href={"/appointment/details/" + appointmentId} role="button" onClick={addAppointment}>Potwierdź termin wizyty</a>
        </div>
      </div>
    </div>
  );
}
 
export default AppointmentPage;