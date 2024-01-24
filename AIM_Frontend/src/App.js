import './App.css';
import React, {useState} from "react";
import ParentComponent from "./Components/ParentComponent";
import {AppProvider} from "./AppContext";

function App() {

    return (
            <AppProvider>
                <ParentComponent/>
            </AppProvider>
    );
}

export default App;
