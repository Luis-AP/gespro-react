import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
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

function RichTextEditor({ placeholder = "Escribe algo...", field }) {
    //const quillRef = useRef(null);

    return (
        <ReactQuill
            {...field}
            placeholder={placeholder}
            theme="snow"
            modules={modules}
            formats={formats}
            className="h-[calc(100%-5rem)]"
        />
    );
}

export default RichTextEditor;
