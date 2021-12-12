import pl from "date-fns/locale/pl";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import useFetch from "use-http";
import Navbar from './Navbar';

const AppointmentPage = () =>  {
  
  const history = useHistory();

  var now  = new Date();
  now.setDate(now.getDate() + 1)
  now.setHours(8);
  now.setMinutes(0);
  now.setSeconds(0);
  
  const [selectedDate, setSelectedDate] = useState(now);
  const [selectedTime, setSelectedTime] = useState(now);
  const [appointmentId, setAppointmentId] = useState();
  const [excludeTimes, setExcludeTimes] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const {post, response } = useFetch(
      'api/appointments/new_appointment',
      {
          headers: {
              userId: sessionStorage.getItem('userId'),
          },
          cachePolicy: 'no-cache',
      }
  );

  const {get, response } = useFetch(
    'api/appointments',
    {
        headers: {
            userId: sessionStorage.getItem('userId'),
        },
        cachePolicy: 'no-cache',
    }
);

  const handleDateChange = (date) => {
    setExcludeTimes([]);
    setSelectedDate(date);
    setSelectedTime(date);
    
    for(var i=0; i<allAppointments.length; i++){
      if(i.Date == selectedDate.toLocaleDateString()){
        excludeTimes.push(new Date(0,0,0).setHours(i.Time.getHours(),i.Time.getMinutes(),0));
      }
    }
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

  const getAppointments = async () => {

    const data = await get("");

    if (response.ok) {
      setAllAppointments(data);
    }
  }
  
  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

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