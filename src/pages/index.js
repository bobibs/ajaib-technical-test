import React from 'react';

const Suspensed = (Element) =>
  function suspense(props) {
    return (
      <React.Suspense fallback={<div />}>
        <Element {...props} />
      </React.Suspense>
    );
  };

const Pages = {
  Home: Suspensed(React.lazy(() => import('./Home'))),
  PageNotFound: Suspensed(React.lazy(() => import('./PageNotFound'))),
};

export default Pages;
