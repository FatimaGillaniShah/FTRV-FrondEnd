import React from 'react';
import { Box, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import BallotIcon from '@material-ui/icons/Ballot';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Poll } from '../../poll';
import Filters from './filter';
import { Modal, navigateTo } from '../../../utils/helper';
import Show from '../../show';
import { Search } from '../../search/search';

export function PollsPage({
  data,
  onHandleSearch,
  onHandleSwitchChange,
  query,
  filterToggle,
  onClearFilter,
  onHandleFilterSearch,
  initialFilterValues,
}) {
  const history = useHistory();

  const handleDeleteEvent = () => {
    Modal.fire();
  };

  return (
    <>
      <WrapInBreadcrumbs>
        <Box width={1}>
          <WrapInCard mb={8}>
            <Box display="flex">
              <Search
                name="Polls"
                showToggle={false}
                onHandleSearch={onHandleSearch}
                onHandleSwitchChange={onHandleSwitchChange}
                initialValues={query}
                checked={filterToggle}
              />
            </Box>
            <Box mt={2}>
              <Show IF={filterToggle}>
                <Filters
                  onHandleFilterSearch={onHandleFilterSearch}
                  onClear={onClearFilter}
                  initialValues={initialFilterValues}
                />
              </Show>
            </Box>
          </WrapInCard>
          <WrapInCard>
            <Box mt={7}>
              <Button
                startIcon={<AddIcon fontSize="small" />}
                variant="contained"
                color="secondary"
                type="button"
                onClick={() => navigateTo(history, '/polls/add')}
              >
                New Poll
              </Button>
            </Box>

            <Show
              IF={data?.length > 0}
              Icon={BallotIcon}
              description=" No Polls To Show"
            >
              <Box
                display="flex"
                flexDirection={['column', 'column', 'column', 'row']}
              >
                {data?.map((val) => (
                  <Box mr={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        onClick={() =>
                          navigateTo(history, `/polls/edit/${val.id}`)
                        }
                      >
                        <EditIcon color="secondary" />
                      </IconButton>
                      <IconButton onClick={handleDeleteEvent}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                    <Poll
                      name={val.name}
                      description={val.description}
                      options={val.options}
                    />
                  </Box>
                ))}
              </Box>
            </Show>
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}
