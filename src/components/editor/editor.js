import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";

const Editor = ({ setdata }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data=""
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setdata(window.btoa(data));
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
      config={{
        toolbar: {
          shouldNotGroupWhenFull: true,
          items: ["bold", "|", "MathType", "ChemType"],
        },
      }}
    />
  );
};

export default Editor;
