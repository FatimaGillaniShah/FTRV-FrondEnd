import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { Loading } from '../../components/loading';
import {
  createGroup,
  getResources,
  getGroupById,
  updateGroup,
  getUsersByGroupId,
} from '../../state/queryFunctions';
import { navigateTo, Toast } from '../../utils/helper';
import { keys } from '../../state/queryKeys';
import CreateGroupPage from '../../components/pages/createGroup';
import {
  defaultResources,
  dependentResources,
  PERMISSIONS,
} from '../../utils/constants';
import Show from '../../components/show';

function CreateGroup() {
  const queryClient = useQueryClient();
  const [groupPage, setGroupPage] = useState(0);
  const [userPage, setUserPage] = useState(0);
  const { id: groupId } = useParams();
  const [defaultFeatures, setDefaultResource] = useState([]);
  const history = useHistory();
  const [resource, setResource] = useState([]);
  const [filters, setFilter] = useState({ name: '' });
  const { data, isLoading } = useQuery(keys.resources(filters), getResources, {
    keepPreviousData: true,
  });
  const { READ, WRITE } = PERMISSIONS;

  const resources = data?.data?.data;
  const { data: groupById, isLoading: isGroupByIdLoading } = useQuery(
    keys.getGroup(groupId),
    getGroupById,
    {
      enabled: !!groupId,
      onError: ({
        response: {
          data: { message },
        },
      }) => {
        Toast({
          icon: 'error',
          title: message || 'Some error occurred',
        });
      },
    }
  );

  const group = groupById?.data?.data[0];
  const { data: usersByGroupId, isLoading: isUsersLoading } = useQuery(
    keys.getUsersById(groupId),
    getUsersByGroupId,
    {
      enabled: !!groupId,
    }
  );
  const handleSearch = debounce(({ target }) => {
    setFilter({ name: target.value });
  }, 500);
  const groupUsers = usersByGroupId?.data.data;
  const onGroupSuccess = () => {
    queryClient.invalidateQueries(keys.groups);
    Toast({
      icon: 'success',
      title: `Group  ${groupId ? 'Updated' : 'Created'}  successfully`,
    });
    if (groupId) queryClient.invalidateQueries(keys.getGroup(groupId));
    navigateTo(history, '/groups');
  };

  const onGroupError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };
  const { mutate, isLoading: isGroupLoading } = useMutation(
    groupId ? updateGroup : createGroup,
    {
      onSuccess: onGroupSuccess,
      onError: onGroupError,
    }
  );

  useEffect(() => {
    const defaultFeature = resources?.filter((feature) => {
      if (defaultResources.includes(feature.slug)) {
        const groupFeature = feature;
        groupFeature.permissions = [READ];
        return defaultResources;
      }

      return false;
    });
    setDefaultResource(defaultFeature);
    if (defaultFeature && group?.resources && groupId) {
      const ids = new Set(group?.resources.map((feature) => feature.id));
      const mergedResources = [
        ...group?.resources,
        ...defaultFeature.filter((feature) => !ids.has(feature.id)),
      ];
      setResource(mergedResources);
    } else {
      setResource(defaultFeature);
    }
  }, [group, resources]);

  const initialValues = {
    groupName: group?.name || '',
    description: group?.description || '',
  };

  const handleHeaderChange = (event, isChecked, permission) => {
    const isReadChecked = permission === PERMISSIONS.READ && isChecked;
    const isWriteUnChecked = permission === PERMISSIONS.WRITE && !isChecked;
    const isWriteChecked = permission === PERMISSIONS.WRITE && isChecked;

    if (isWriteChecked) {
      const allResourcesWithWrite = resources?.map((feature) => {
        const writeResource = { ...feature };
        writeResource.permissions = [READ, WRITE];
        return writeResource;
      });
      setResource(allResourcesWithWrite);
    } else if (isReadChecked || isWriteUnChecked) {
      const allResourcesWithRead = resources?.map((feature) => {
        const readResource = { ...feature };
        const isDependentResource = dependentResources.some(
          ({ dependent, readOnly }) => dependent === feature.slug && !readOnly
        );
        if (isDependentResource) {
          readResource.permissions = [READ, WRITE];
        } else {
          readResource.permissions = [READ];
        }
        return readResource;
      });

      setResource(allResourcesWithRead);
    } else {
      const readWriteResorce = defaultFeatures?.map((feature) => {
        const readResource = { ...feature };
        if (readResource.permissions.includes(PERMISSIONS.WRITE)) {
          readResource.permissions = [READ];
        }
        return readResource;
      });
      setResource(readWriteResorce);
    }
  };
  const handleChange = (event, isChecked, resourceInfo, permission) => {
    const permissions =
      permission === PERMISSIONS.READ ? [READ] : [READ, WRITE];
    const resourceObj = {
      ...resourceInfo,
      permissions,
    };
    // repeat when read is already Checked
    const repeatResource = resource.find(
      (feature) => feature.id === resourceInfo.id
    );
    if (isChecked) {
      const [dependentResource] = isDependentResource(resourceInfo.slug);
      if (dependentResource && !repeatResource) {
        setResource([...resource, resourceObj, dependentResource]);
      } else if (repeatResource) {
        repeatResource.permissions = [READ, WRITE];
        setResource([...resource]);
      } else {
        setResource([...resource, resourceObj]);
      }
    } else {
      const [dependentResource] = dependentResources.filter(
        ({ subject }) => resourceInfo.slug === subject
      );
      const filterUncheckedResource = resource.filter(({ id, slug }) => {
        const isNotRepeatResource = id !== repeatResource.id;
        const isSubjectAndDependent =
          slug !== dependentResource?.subject &&
          slug !== dependentResource?.dependent;
        if (dependentResource?.subject) {
          return isNotRepeatResource && isSubjectAndDependent;
        }
        return isNotRepeatResource;
      });
      setResource(filterUncheckedResource);
    }
  };
  const handleSubmit = (values) => {
    const { groupName, description } = values;
    const groupObj = {
      id: groupId,
      description,
      name: groupName,
      resources: resource,
    };
    mutate(groupObj);
  };
  const isDependentResource = (slug) =>
    dependentResources
      .map(({ subject, dependent, readOnly }) => {
        if (slug === subject) {
          let [dependentResource] = resources.filter(
            ({ slug: resourceSlug }) => resourceSlug === dependent
          );
          dependentResource = {
            ...dependentResource,
            permissions: readOnly ? [READ] : [READ, WRITE],
          };
          return dependentResource;
        }
        return false;
      })
      .filter((dependentResource) => dependentResource);

  return (
    <>
      <Helmet>
        <title>Create Group</title>
      </Helmet>
      <Show IF={isGroupByIdLoading || isUsersLoading || isLoading}>
        <Loading />
      </Show>
      <Show IF={!isGroupByIdLoading && !isUsersLoading && !isLoading}>
        <CreateGroupPage
          id={groupId}
          onHandleSubmit={handleSubmit}
          resources={resources}
          resource={resource}
          groupUsers={groupUsers}
          groupPage={groupPage}
          defaultResources={defaultResources}
          setGroupPage={setGroupPage}
          userPage={userPage}
          setUserPage={setUserPage}
          onHandleSearch={handleSearch}
          initialValues={initialValues}
          onHandleHeaderChange={handleHeaderChange}
          onHandleChange={handleChange}
          loading={isGroupLoading}
          resourceLoading={isLoading}
        />
        )
      </Show>
    </>
  );
}

export default memo(CreateGroup);
