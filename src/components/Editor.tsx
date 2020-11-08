import React from 'react';
import Quill from 'quill';
import { AppState } from '../redux/types';
import { connect } from 'react-redux';
import { setScriptForActiveFile } from '../redux/actions';
import { File } from '../redux/types';

export function Editor(props: { activeFile: string, editorContent: string; setScriptForActiveFile: any }) {
    const { editorContent, setScriptForActiveFile, activeFile } = props;
    const quillRef = React.useRef<Quill>();

    React.useEffect(() => {
        quillRef.current = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: false,
            },
        });
        quillRef.current.on('text-change', () => setScriptForActiveFile(quillRef.current?.getText()));
    }, [setScriptForActiveFile]);

    React.useEffect(() => {
        if (quillRef.current === undefined) {
            return;
        }
        quillRef.current.setText(editorContent);
    }, [activeFile]);

    return (
        <div style={editorWrapperStyles}>
            <div style={editorStyles} id={'editor'}></div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    activeFile: state.activeFile,
    editorContent: getScriptByFilename(state.files, state.activeFile),
});

const mapDispatchToProps = (dispatch: any) => ({
    setScriptForActiveFile: (script: string) =>
        dispatch(setScriptForActiveFile(script)),
});

function getScriptByFilename(files: ReadonlyArray<File>, filename: string): string {
    const file = files.find((f) => f.filename === filename);
    return file ? file.editorContent : '';
}

export const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(Editor);

const editorWrapperStyles: React.CSSProperties = {
    background: '#bfc4b9',
    height: '60%',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const editorStyles: React.CSSProperties = {
    height: '90%',
    width: '90%',
    background: '#42ad6d',
};
