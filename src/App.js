import './App.css';
import styled, { css } from "styled-components";
import { Outlet } from 'react-router-dom';
import { Toaster } from './ui-components/toaster';
import LoadingState from './ui-components/loading';

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`

function App() {
  return (<>
      <AppWrapper>
        <Outlet />
        <Toaster />
        <LoadingState />
      </AppWrapper>

    </>
  );
}

export default App;
