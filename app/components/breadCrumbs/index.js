import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BodyTextLarge } from '../typography';

function toTitleCase(str) {
  return str.replace(
    /\b\w+/g,
    (s) => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
  );
}

const useStyles = makeStyles(() => ({
  linkStyle: {
    textDecoration: 'none',
  },
}));

const ROUTES_WHERE_YOU_NEED_TO_EXCLUDE_LAST_ENTRY = ['edit']; // edit/543

// input [edit,543] - output [edit]
// eslint-disable-next-line no-unused-vars
const removeLastEntryFromRouteArray = (routeArray) => {
  if (
    ROUTES_WHERE_YOU_NEED_TO_EXCLUDE_LAST_ENTRY.includes(
      routeArray[routeArray.length - 2]
    )
  ) {
    return routeArray.pop();
  }
  return routeArray;
};

const breadCrumbsCustomNames = {
  quote: 'myquote',
};

// eslint-disable-next-line no-unused-vars
const chooseBreadCrumbsCustomNames = (routeArray) => {
  const result = {};
  routeArray.map((value, index) => {
    if (breadCrumbsCustomNames[value]) {
      result[index] = breadCrumbsCustomNames[value];
    } else {
      result[index] = value;
    }
    return result;
  });

  return result;
};
export default function App() {
  const location = useLocation();
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);
  if (
    ROUTES_WHERE_YOU_NEED_TO_EXCLUDE_LAST_ENTRY.includes(
      pathnames[pathnames.length - 2]
    )
  ) {
    pathnames.pop();
  }
  // const data = chooseBreadCrumbsCustomNames(pathnames);
  // console.log('data', data);
  const lastIndex = pathnames.length - 1;

  return (
    <Breadcrumbs aria-label="Breadcrumb">
      <Link className={classes.linkStyle} to="/">
        <BodyTextLarge component="span" color="secondary">
          Home
        </BodyTextLarge>
      </Link>

      {pathnames.map((value, index) => {
        const last = index === lastIndex;
        const to = `/${pathnames.slice(0, index + 1)}`;
        let result = <> </>;
        if (last) {
          result = (
            <BodyTextLarge component="span" color="primary">
              {toTitleCase(value)}
            </BodyTextLarge>
          );
        } else {
          result = (
            <Link
              color="inherit"
              to={to}
              key={to}
              className={classes.linkStyle}
            >
              <BodyTextLarge component="span" color="secondary">
                {toTitleCase(value)}
              </BodyTextLarge>
            </Link>
          );
        }

        return result;
      })}
    </Breadcrumbs>
  );
}
