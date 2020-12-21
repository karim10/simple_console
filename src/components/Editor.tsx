import React from 'react';
import Quill from 'quill';
import { AppState } from '../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { setScript } from '../redux/actions';

export function EditorWrapper() {
    const activeFile = useSelector<AppState, string>((state) => state.activeFile);

    return <Editor activeFile={activeFile} />;
}

function Editor(props: { activeFile: string }) {
    const quillRef = React.useRef<Quill>();
    const dispatch = useDispatch();
    const fileContent = useSelector<AppState, string>(
        (state) => state.files.find((f) => f.filename === props.activeFile)?.editorContent ?? ''
    );

    React.useEffect(() => {
        quillRef.current = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: false,
            },
        });
    }, []);

    React.useEffect(() => {
        const textChangeHandler = () =>
            dispatch(setScript(props.activeFile, quillRef.current?.getText() ?? ''));
        quillRef.current?.on('text-change', textChangeHandler);
        return () => {
            quillRef.current?.off('text-change', textChangeHandler);
        };
    }, [dispatch, props.activeFile]);

    React.useEffect(() => {
        if (quillRef.current && fileContent !== undefined) {
            quillRef.current.setText(fileContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeFile]);

    return (
        <div style={editorWrapperStyles}>
            <div style={editorStyles} id={'editor'}></div>
        </div>
    );
}

const editorWrapperStyles: React.CSSProperties = {
    background: '#b3d5fc',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const editorStyles: React.CSSProperties = {
    height: '90%',
    width: '90%',
    background: 'white',
    border: 'solid 2px',
    borderRadius: '10px'
};
