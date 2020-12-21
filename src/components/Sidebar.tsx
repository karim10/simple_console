import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, File } from '../redux/types';
import { addFile, setActiveFile } from '../redux/actions';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

export function Sidebar() {
    const state = useSelector<AppState, AppState>((state) => state);
    const dispatch = useDispatch();
    const inputEl = React.useRef<HTMLInputElement>(null);

    const [adding, setAdding] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (adding && inputEl.current) {
            inputEl.current.focus();
        }
    })

    const addFileHandler = (filename: string) => {
        dispatch(addFile(filename));
    };
    const setActiveFileHandler = (filename: string) => {
        dispatch(setActiveFile(filename));
    };

    const addFileInSidebar = () => {
        const filenameToAdd = getNewFilename(state.files, inputValue);
            
        addFileHandler(filenameToAdd);
        setActiveFileHandler(filenameToAdd);
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
                    const isActive = file.filename === state.activeFile;
                    return (
                        <button
                            style={fileButtonStyles(isActive)}
                            key={file.filename}
                            onClick={() => setActiveFileHandler(file.filename)}
                        >
                            {file.filename}
                        </button>
                    );
                })}
                {adding ? (
                    <div style={{ display: 'flex', backgroundColor: 'white' }}>
                        <input
                            style={addInputStyles}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleEnterDown}
                            ref={inputEl}
                        />
                        <AddCircleOutlineRoundedIcon
                            onClick={addFileInSidebar}
                            style={{ paddingTop: '10px', cursor: 'pointer' }}
                        />
                    </div>
                ) : null}
            </div>
            <button
                style={addButtonStyle}
                onClick={() => setAdding(true)}
            >
                Add
            </button>
        </>
    );
}

function getNewFilename(files: ReadonlyArray<File>, filename: string): string {
    if (files.find(f => f.filename === filename)) {
        return getNewFilename(files, filename.concat('_'));
    }

    return filename;
}

const filesWrapperStyles: React.CSSProperties = {
    height: '100%',
    overflowY: 'auto',
};

const fileButtonStyles: (isActive: boolean) => React.CSSProperties = (isActive: boolean) => ({
    height: '50px',
    width: '100%',
    border: 0,
    boxShadow: 'none',
    borderBottom: 'solid 2px black',
    backgroundColor: isActive ? '#cbced4' : '#6c757d',
    color: 'white'
});

const addInputStyles: React.CSSProperties = {
    height: '50px',
    width: '100%',
    border: 0,
    boxShadow: 'none',
};

const addButtonStyle: React.CSSProperties = {
    bottom: '0px',
    height: '50px',
    borderRadius: 0,
    borderTop: 'solid 2px black',
    backgroundColor: '#6c757d',
    color: 'white'
};
