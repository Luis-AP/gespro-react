import "react-quill/dist/quill.snow.css";
import "./rich-text-viewer.css";

const RichTextViewer = ({ content }) => {
    if (!content) return null;

    return (
        <div
            className="ql-viewer"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default RichTextViewer;
