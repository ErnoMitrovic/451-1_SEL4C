import React from "react";
import { FormsCard } from "../components/FormsCard";

export default function Login({onLogin}) {
    return (
        <>
            <FormsCard onLogin={onLogin}/>
        </>
    );
}
