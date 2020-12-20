import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { Console } from './components/Console';
import { EditorWrapper } from './components/Editor';
import { ConnectedSidebar } from './components/Sidebar';

import './App.css';

function App() {
    console.log('App State: ', store.getState());
    return (
        <Provider store={store}>
            <div style={containerStyles}>
                <div style={sideBarWrapperStyles}>
                    <ConnectedSidebar />
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
    background: 'grey',
    padding: '50px',
};

// Side bar
const sideBarWrapperStyles: React.CSSProperties = {
    background: '#99a8ba',
    height: '100%',
    flexBasis: '20%',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    border: 'solid',
};

// Content - right side
const contentWrapperStyles: React.CSSProperties = {
    background: 'green',
    flexGrow: 1,
    height: '100%',
    borderStyle: 'solid',
};

export default App;
