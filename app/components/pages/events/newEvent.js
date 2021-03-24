// import { Box, Button } from '@material-ui/core';
// import React, { memo, useState } from 'react';
// import AddIcon from '@material-ui/icons/Add';
// import { Form, Formik } from 'formik';
// import { Dailogue, Input } from '../..';

// export const NewEvent = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpenDailogue = () => {
//     setOpen(true);
//   };

//   const handleCloseDailogue = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Button
//         variant="contained"
//         color="secondary"
//         startIcon={<AddIcon />}
//         onClick={handleOpenDailogue}
//       >
//         New Event
//       </Button>
//       <Dailogue
//         onClose={handleCloseDailogue}
//         open={open}
//         title="Create New Event"
//         content={
//           <Formik initialValues={{}}>
//             <Form>
//               <Box width={[1, 1 / 2]} mb={5}>
//                 <Input name="name" variant="outlined" />
//               </Box>
//               <Box width={[1, 1 / 2]} mb={5}>
//                 <Input name="name" variant="outlined" />
//               </Box>
//             </Form>
//           </Formik>
//         }
//       />
//     </>
//   );
// };

// export default memo(NewEvent);
