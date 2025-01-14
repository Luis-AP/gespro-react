import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ font: Font.whitelist }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

function RichTextEditor({ placeholder = "Escribe algo..." }) {
    const [description, setDescription] = useState("");

    return (
        <ReactQuill
            value={description}
            onChange={setDescription}
            placeholder={placeholder}
            theme="snow"
            modules={modules}
            formats={formats}
            className="h-[calc(100%-3rem)]
            [&_.ql-toolbar]:bg-neutral-800
            [&_.ql-toolbar]:border-neutral-700
            [&_.ql-toolbar]:text-neutral-500
            [&_.ql-editor]:bg-white
            [&_.ql-editor]:text-neutral-500
            [&_.ql-editor]:placeholder:text-neutral-500
            [&_.ql-editor]:border-none
            [&_.ql-picker-label]:text-red-500
            [&_.ql-picker-label:hover]:text-red-700"
        />
    );
}

export default RichTextEditor;
