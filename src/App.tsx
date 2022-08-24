import React, {CSSProperties, FC, ReactNode, useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const BUTTON_WRAPPER_STYLES: CSSProperties = {
    position: 'relative',
    zIndex: 1
}

const OTHER_CONTENT_STYLES: CSSProperties = {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'red',
    padding: '10px'
}

const App: FC = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div style={BUTTON_WRAPPER_STYLES} onClick={()=>console.log('clicked')}>
                <button onClick={() => setOpen(true)}>Open modal</button>
                <Modal open={open} onClose={() => setOpen(false)}>Модальное окно</Modal>
            </div>


            <div style={OTHER_CONTENT_STYLES}>Other content</div>
        </div>
    );
}

export default App;

const MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLE: CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
}

const Modal: FC<{ children: ReactNode, open: boolean, onClose: () => void }> = ({children, open, onClose}) => {
    if (!open) return null;

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLE}/>
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>
        , document.getElementById('portal')!)

}
