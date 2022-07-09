import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-mathtype";

class Editor extends Component {
  render() {
    return (
      <div className="App">
        <h4>Welcome to the editor</h4>
        <CKEditor
          editor={ClassicEditor}
          data="<p>This is the content area</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
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
              items: [
                // 'heading', '|',
                // 'fontfamily', 'fontsize', '|',
                // 'alignment', '|',
                // 'fontColor', 'fontBackgroundColor', '|',
                // 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                // 'link', '|',
                // 'outdent', 'indent', '|',
                // 'bulletedList', 'numberedList', 'todoList', '|',
                // 'code', 'codeBlock', '|',
                // 'insertTable', '|',
                // 'uploadImage', 'blockQuote', '|',
                "heading",
                "fontsize",
                "alignment",
                "fontColor",
                "fontBackgroundColor",
                "outdent",
                "indent",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "imageUpload",
                "mediaEmbed",
                "insertTable",
                "blockQuote",
                "undo",
                "redo",
                "|",
                "MathType",
                "ChemType"
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Editor;
