import { Suspense } from 'react';
import NavigationButton from './NavigationButton';
import PropTypes from 'prop-types';

function DefaultLayout({ children }) {
  return (
    <div className='app'>
      <header>
        <div className='loading'>
          {/* <LoadingBar/> */}
        </div>
        <div className='top-bar'>
          <h1>Dicoding Forum App</h1>
        </div>
      </header>
      <main>
        <Suspense fallback={<>loading...</>}>
          {children}
        </Suspense>
      </main>
      <footer>
        <NavigationButton />
      </footer>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;