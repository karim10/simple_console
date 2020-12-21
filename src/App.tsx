import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { Console } from './components/Console';
import { EditorWrapper } from './components/Editor';
import { Sidebar } from './components/Sidebar';

function App() {
    return (
        <Provider store={store}>
            <div style={containerStyles}>
                <div style={sideBarWrapperStyles}>
                    <Sidebar />
                </div>
                <div style={contentWrapperStyles}>
                    <EditorWrapper />
                    <Console />
                </div>
            </div>
        </Provider>
    );
}

// Container
const containerStyles: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    padding: '50px',
};

// Side bar
const sideBarWrapperStyles: React.CSSProperties = {
    background: '#b3d5fc',
    height: '100%',
    flexBasis: '20%',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: 'solid',
    borderTop: 'solid',
    borderBottom: 'solid',
    borderRadius: '20px 0 0 20px',
    overflow: 'hidden',
};

// Content - right side
const contentWrapperStyles: React.CSSProperties = {
    flexGrow: 1,
    height: '100%',
    borderTop: 'solid',
    borderRight: 'solid',
    borderLeft: 'solid 2px',
    borderBottom: 'solid',
    borderRadius: '0 20px 20px 0',
    overflow: 'hidden',
};

export default App;
