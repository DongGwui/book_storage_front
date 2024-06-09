import {PDFEditorRef, PDFEditor} from "react-pdf-editor"
import {useRef} from "react";

const App = () => {
    const ref = useRef<PDFEditorRef>(null);
    ref.current?.formFields;
    return <><PDFEditor src="/form.pdf" ref={ref} /></>
}