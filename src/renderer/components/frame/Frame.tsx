import * as React from 'react'
import { remote } from 'electron'
import './Frame.css'

function closeHandler() {
    const window = remote.getCurrentWindow()
    window.close()
}

function restoreDownHandler() {
    const window = remote.getCurrentWindow()
    if(window.isMaximized()){
        window.unmaximize()
    } else {
        window.maximize()
    }
    (document.activeElement as HTMLElement).blur()
}

function minimizeHandler() {
    const window = remote.getCurrentWindow()
    window.minimize();
    (document.activeElement as HTMLElement).blur()
}

const Frame = (): JSX.Element => (
    <div id="frameBar">
        <div id="frameResizableTop" className="frameDragPadder"></div>
        <div id="frameMain">
            <div className="frameResizableVert frameDragPadder"></div>
            { process.platform === 'darwin' ?
                <div id="frameContentDarwin">
                    <div id="frameButtonDockDarwin">
                        <button className="frameButtonDarwin" onClick={closeHandler} id="frameButtonDarwin_close" tabIndex={-1}></button>
                        <button className="frameButtonDarwin" onClick={minimizeHandler} id="frameButtonDarwin_minimize" tabIndex={-1}></button>
                        <button className="frameButtonDarwin" onClick={restoreDownHandler} id="frameButtonDarwin_restoredown" tabIndex={-1}></button>
                    </div>
                </div>
                : 
                <div id="frameContentWin">
                    <div id="frameTitleDock">
                        <span id="frameTitleText">Helios Launcher</span>
                    </div>
                    <div id="frameButtonDockWin">
                        <button className="frameButton" onClick={minimizeHandler} id="frameButton_minimize" tabIndex={-1}>
                            <svg name="TitleBarMinimize" width="10" height="10" viewBox="0 0 12 12"><rect stroke="#ffffff" fill="#ffffff" width="10" height="1" x="1" y="6"></rect></svg>
                        </button>
                        <button className="frameButton" onClick={restoreDownHandler} id="frameButton_restoredown" tabIndex={-1}>
                            <svg name="TitleBarMaximize" width="10" height="10" viewBox="0 0 12 12"><rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="#ffffff" strokeWidth="1.4px"></rect></svg>
                        </button>
                        <button className="frameButton" onClick={closeHandler} id="frameButton_close" tabIndex={-1}>
                            <svg name="TitleBarClose" width="10" height="10" viewBox="0 0 12 12"><polygon stroke="#ffffff" fill="#ffffff" fillRule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon></svg>
                        </button>
                    </div>
                </div>
            }
            <div className="frameResizableVert frameDragPadder"></div>
        </div>
    </div>
)

export default Frame