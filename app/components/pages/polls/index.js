import React from 'react';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import BallotIcon from '@material-ui/icons/Ballot';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Poll } from '../../poll';
import { navigateTo } from '../../../utils/helper';
import Filters from './filter';
import Show from '../../show';
import { Search } from '../../search/search';
import { Button } from '../..';

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  iconImage: {
    width: '10%',
    height: '10%',
  },
}));

export function PollsPage({
  data,
  onHandleSearch,
  onHandleSwitchChange,
  query,
  filterToggle,
  onClearFilter,
  onHandleFilterSearch,
  initialFilterValues,
  initialValues,
  onHandleDelete,
  onHandleChange,
  currentPage,
  count,
  voted,
}) {
  const history = useHistory();
  const classes = useStyles();
  const defaultPage = 1;
  const noOfPages = Math.ceil(count / 9);
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
            <Box mt={7} pl={4.5}>
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
                flexWrap="wrap"
                justifyContent="space-between"
                flexDirection={['column', 'column', 'row', 'row']}
                width={1}
                p={4}
              >
                {data?.map(
                  ({
                    id,
                    name,
                    options,
                    question,
                    status,
                    expired,
                    pending,
                  }) => (
                    <Box mt={8} mb={8} width={[1, 1, 1 / 2, '30%']}>
                      <Poll
                        id={id}
                        name={name}
                        description={question}
                        options={options}
                        status={status}
                        expired={expired}
                        pending={pending}
                        initialValues={initialValues}
                        onHandleDelete={onHandleDelete}
                        voted={voted}
                      />
                    </Box>
                  )
                )}
              </Box>
            </Show>
            <Box component="span">
              <Pagination
                count={noOfPages}
                page={currentPage}
                onChange={onHandleChange}
                defaultPage={defaultPage}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
              />
            </Box>
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}
