import React, { useState } from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import { Tabs } from 'components';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style';
import TabPanel from '../../tabPanel/index';
import DocumentList from './documentList';

function tabProps(id) {
  return {
    id: `vertical-tab-${id}`,
  };
}

export default function DocumentTabs({
  departments,
  onHandleDelete,
  onHandleSortOrder,
  isWriteAllowed,
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e, tab) => {
    setSelected(tab);
  };
  return (
    <Box display="flex" flexDirection={['column', 'column', 'row', 'row']}>
      <Tabs
        orientation={match ? 'horizontal' : 'vertical'}
        variant="scrollable"
        value={selected}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator,
        }}
      >
        {departments?.map((department) => (
          <Tab
            classes={{ root: classes.tab, selected: classes.selectedTab }}
            label={department.name}
            {...tabProps(department.id)}
          />
        ))}
      </Tabs>
      {departments?.map((department, index) => (
        <TabPanel value={selected} index={index} width={[1, 1, 1 / 2, 1 / 2]}>
          <DocumentList
            departments={departments}
            departmentName={department.name}
            onHandleDelete={onHandleDelete}
            onHandleSortOrder={onHandleSortOrder}
            isWriteAllowed={isWriteAllowed}
          />
        </TabPanel>
      ))}
    </Box>
  );
}
