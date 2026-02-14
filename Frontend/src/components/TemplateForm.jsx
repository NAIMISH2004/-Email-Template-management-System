import { useEffect, useState } from "react";
import API from "../services/api";

export default function TemplateForm({ onSaved, editData, clearEdit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        if (editData) {
            setName(editData.name || "");
            setEmail(editData.email || "");
            setCompany(editData.company || "");
            setSubject(editData.subject || "");
            setBody(editData.body || "");
        }
    }, [editData]);

    const submit = async() => {
        if (!name || !email || !company || !subject || !body) {
            alert("Fill all fields");
            return;
        }

        try {
            if (editData) {
                await API.put(`/${editData.id}`, {
                    subject,
                    body,
                    email,
                    company,
                });
                alert("Updated");
                clearEdit();
            } else {
                await API.post("/", {
                    name,
                    email,
                    company,
                    subject,
                    body,
                });
                alert("Saved");
            }

            setName("");
            setEmail("");
            setCompany("");
            setSubject("");
            setBody("");

            onSaved();
        } catch (err) {
            console.error(err);
            alert("Save failed");
        }
    };

    return ( <
        div >
        <
        h2 > { editData ? "Edit Template" : "Create Template" } < /h2>{" "} <
        input type = "text"
        placeholder = "Name"
        value = { name }
        disabled = {!!editData }
        onChange = {
            (e) => setName(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        input type = "text"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        input type = "text"
        placeholder = "Company Name"
        value = { company }
        onChange = {
            (e) => setCompany(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        input type = "text"
        placeholder = "Subject (Use {{name}}, {{email}}, {{company}})"
        value = { subject }
        onChange = {
            (e) => setSubject(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        textarea placeholder = "Body (Use {{name}} {{email}} {{company}})"
        rows = "6"
        value = { body }
        onChange = {
            (e) => setBody(e.target.value) }
        />{" "} <
        br / > < br / >
        <
        button onClick = { submit } > { editData ? "Update" : "Save" } < /button>{" "} {
            editData && ( <
                button onClick = {
                    () => {
                        clearEdit();
                        setName("");
                        setEmail("");
                        setCompany("");
                        setSubject("");
                        setBody("");
                    }
                }
                style = {
                    { marginLeft: "10px" } } >
                Cancel { " " } <
                /button>
            )
        } { " " } <
        /div>
    );
}