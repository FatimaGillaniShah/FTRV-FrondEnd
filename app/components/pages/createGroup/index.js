import { Box, Tab } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from '../../tabPanel/index';
import GroupUsers from '../../groupUsers/index';
import Show from '../../show';
import { Tabs, WrapInCard } from '../../index';
import { H5 } from '../../typography';
import { colors } from '../../../theme/colors';
import Group from './group';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';

const useStyles = makeStyles(() => ({
  label: {
    color: colors.black,
  },
}));

export function GroupTabs({
  onHandleSubmit,
  id,
  groupUsers,
  initialValues,
  loading,
  onHandleChange,
  onHandleSearch,
  resources,
  resource,
  userPage,
  defaultResources,
  setUserPage,
  groupPage,
  resourceLoading,
  onHandleHeaderChange,
  setGroupPage,
}) {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Box ml={2}>
          <Show IF={!id}>
            <Box my={7}>
              <H5>Create New Group </H5>
              <Box width={1}>
                <Group
                  id={id}
                  data={resources}
                  initialValues={initialValues}
                  onHandleSubmit={onHandleSubmit}
                  resource={resource}
                  groupPage={groupPage}
                  defaultResources={defaultResources}
                  setGroupPage={setGroupPage}
                  onHandleSearch={onHandleSearch}
                  onHandleHeaderChange={onHandleHeaderChange}
                  onHandleChange={onHandleChange}
                  loading={loading}
                  resourceLoading={resourceLoading}
                />
              </Box>
            </Box>
          </Show>
          <Show IF={id}>
            <Box borderBottom={`1px solid ${colors.bottleGrey}`}>
              <Tabs
                orientation="horizontal"
                variant="scrollable"
                value={value}
                onChange={handleChange}
              >
                <Tab index={0} className={classes.label} label="Edit Group" />
                <Tab index={1} className={classes.label} label="Users" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} width={1}>
              <Group
                id={id}
                data={resources}
                initialValues={initialValues}
                onHandleSubmit={onHandleSubmit}
                groupPage={groupPage}
                onHandleSearch={onHandleSearch}
                setGroupPage={setGroupPage}
                resource={resource}
                onHandleHeaderChange={onHandleHeaderChange}
                defaultResources={defaultResources}
                onHandleChange={onHandleChange}
                loading={loading}
                resourceLoading={resourceLoading}
              />
            </TabPanel>

            <TabPanel value={value} index={1} width={1}>
              <GroupUsers
                data={groupUsers}
                userPage={userPage}
                setUserPage={setUserPage}
              />
            </TabPanel>
          </Show>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(GroupTabs);
