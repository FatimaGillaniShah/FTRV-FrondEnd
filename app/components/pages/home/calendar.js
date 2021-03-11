import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function CalenderComp() {
  const [date, changeDate] = useState(new Date());

  return (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          variant="static"
          openTo="date"
          value={date}
          onChange={changeDate}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default CalenderComp;
