import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, useTheme } from '@material-ui/core';

function toTitleCase(str) {
  return str.replace(
    /\b\w+/g,
    (s) => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
  );
}

export default function App() {
  const location = useLocation();
  const theme = useTheme();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('pathnames', pathnames);
  if (['edit'].includes(pathnames[pathnames.length - 2])) {
    pathnames.pop();
  }
  const lastIndex = pathnames.length - 1;
  // if (pathnames[pathnames.length - 2]) {
  //   lastIndex = ['edit'].includes(pathnames[pathnames.length - 2])
  //     ? pathnames.length - 2
  //     : lastIndex;
  // }

  return (
    <Breadcrumbs aria-label="Breadcrumb">
      <Link
        style={{
          textDecoration: 'none',
          color: `${theme.palette.secondary.main}`,
        }}
        to="/"
      >
        Home
      </Link>

      {pathnames.map((value, index) => {
        const last = index === lastIndex;
        const to = `/${pathnames.slice(0, index + 1)}`;
        let result = <> </>;
        console.log(last, value, to);
        if (last) {
          result = (
            <Typography
              component="span"
              color="primary"
              style={{ textTransform: 'capitalize' }}
            >
              {value}
            </Typography>
          );
        } else {
          result = (
            <Link
              color="inherit"
              to={to}
              key={to}
              style={{
                textDecoration: 'none',
                color: `${theme.palette.secondary.main}`,
              }}
            >
              {toTitleCase(value)}
            </Link>
          );
        }

        return result;
      })}
    </Breadcrumbs>
  );
}
