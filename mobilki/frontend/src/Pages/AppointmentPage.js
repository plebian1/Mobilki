import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { useState } from "react";

const AppointmentPage = () =>  {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setselectedTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
    setselectedTime(date);
  };
  
    return (
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
      <button type="submit" class="btn btn-primary">Umów wizytę</button>
      </div>
    </div>
    );
}
 
export default AppointmentPage;