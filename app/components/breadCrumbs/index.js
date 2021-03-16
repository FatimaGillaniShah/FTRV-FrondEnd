import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs, makeStyles } from '@material-ui/core';
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

export default function App() {
  const location = useLocation();
  const classes = useStyles();
  const pathnames = location.pathname.split('/').filter((x) => x);
  if (['edit'].includes(pathnames[pathnames.length - 2])) {
    pathnames.pop();
  }
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
