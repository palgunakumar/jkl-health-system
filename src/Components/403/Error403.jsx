import React from 'react';
import ErrorPage from '../ErrorPage';
import { IconButton } from 'rsuite';
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';

const Error403Component =  () => (
  <ErrorPage code={403}>
    <p className="error-page-title">Oops… You just found an error page</p>
    <p className="error-page-subtitle text-muted ">
      The current page is unavailable or you do not have permission to access.{' '}
    </p>
    <IconButton icon={<ArrowLeftLine />} appearance="primary" href="/">
      Take me home
    </IconButton>
  </ErrorPage>
);
export default Error403Component