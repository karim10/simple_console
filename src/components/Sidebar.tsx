import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from 'react-redux';
import { addFile, setActiveFile } from '../redux/actions';
import { AppState } from '../redux/types';

export function Sidebar(props: {
    state: AppState;
    addFile: (filename: string) => void;
    setActiveFile: (filename: string) => void;
}) {
    const { state, addFile, setActiveFile } = props;
    const [adding, setAdding] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const addFileInSidebar = () => {
        addFile(inputValue);
        setActiveFile(inputValue);
        setAdding(false);
    };

    const handleEnterDown = (e: any) => {
        if (e.key === 'Enter') {
            addFileInSidebar();
        }
    };

    return (
        <>
            <div style={filesWrapperStyles}>
                {state.files.map((file) => {
                    return (
                        <Button
                            variant="secondary"
                            size="lg"
                            block
                            style={fileButtonStyles}
                            key={file.filename}
                            onClick={() => setActiveFile(file.filename)}
                        >
                            {file.filename}
                        </Button>
                    );
                })}
                {adding ? (
                    <InputGroup className="mb-2">
                        <Form.Control
                            id="inlineFormInputGroup"
                            placeholder="Filename"
                            onChange={(e: any) => setInputValue(e.target.value)}
                            onKeyDown={handleEnterDown}
                            style={fileButtonStyles}
                        />
                        <InputGroup.Prepend>
                        </InputGroup.Prepend>
                    </InputGroup>
                ) : null}
            </div>
            <Button
                variant="secondary"
                size="lg"
                block
                style={addButtonStyle}
                onClick={() => setAdding(true)}
            >
                Add
            </Button>
        </>
    );
}

const filesWrapperStyles: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto',
};

const fileButtonStyles: React.CSSProperties = {
    height: '50px',
    borderRadius: 0,
    margin: 0,
    borderBottom: 'solid 1px black',
};

const addButtonStyle: React.CSSProperties = {
    bottom: '0px',
    height: '50px',
    borderRadius: 0,
    borderTop: 'solid 1px black',
};

const mapStateToState = (state: AppState) => ({
    state: state,
});

const mapDispatchToProps = (dispatch: any) => ({
    addFile: (filename: string) => dispatch(addFile(filename)),
    setActiveFile: (filename: string) => dispatch(setActiveFile(filename)),
});

export const ConnectedSidebar = connect(mapStateToState, mapDispatchToProps)(Sidebar);
