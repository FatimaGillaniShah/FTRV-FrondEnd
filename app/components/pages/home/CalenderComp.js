import * as React from 'react';
import { TextField, Card, Box, useTheme } from '@material-ui/core';
import {
  AdapterDateFns,
  LocalizaitonProvider,
  StaticDatePicker,
} from '@material-ui/lab';
import { ThemeProvider } from '@material-ui/styles';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function StaticDatePickerDemo() {
  const [value, setValue] = React.useState(new Date());
  const theme = useTheme();
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Card>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={value}
              onChange={setValue}
            />
          </MuiPickersUtilsProvider>
        </Card>
      </Box>
      {/* // <LocalizationProvider dateAdapter={DateFnsUtils}>
    // <StaticDatePicker
    //   displayStaticWrapperAs="desktop"
    //   openTo="year"
    //   value={value}
    //   onChange={(newValue) => {
    //     setValue(newValue);
    //   }}
    //   renderInput={(params) => <TextField {...params} variant="standard" />}
    // />
    // </LocalizationProvider> */}
    </>
  );
}
