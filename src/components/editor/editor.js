import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorComponent() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
      apiKey='9e51tgqxl3vudoga97o4hfuvizm9jo4cd6e74165wsliwhua'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' },
          toolbar: 'bold italic underline |cut copy paste | ' +
          'undo redo' +
          ' fontselect fontsizeselect | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry ',
          font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
          fontsize_formats:"8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}


// import React, { Component } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "ckeditor5-build-classic-mathtype";

// class Editor extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h4>Welcome to the editor</h4>
//         <CKEditor
//           editor={ClassicEditor}
//           data="<p>This is the content area</p>"
//           onReady={(editor) => {
//             // You can store the "editor" and use when it is needed.
//             console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             console.log({ event, editor, data });
//           }}
//           onBlur={(event, editor) => {
//             console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             console.log("Focus.", editor);
//           }}
//           config={{
//             toolbar: {
//               shouldNotGroupWhenFull: true,
//               items: [
//                 // 'heading', '|',
//                 // 'fontfamily', 'fontsize', '|',
//                 // 'alignment', '|',
//                 // 'fontColor', 'fontBackgroundColor', '|',
//                 // 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
//                 // 'link', '|',
//                 // 'outdent', 'indent', '|',
//                 // 'bulletedList', 'numberedList', 'todoList', '|',
//                 // 'code', 'codeBlock', '|',
//                 // 'insertTable', '|',
//                 // 'uploadImage', 'blockQuote', '|',
                
               
//                 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',

//                 "blockQuote",
//                 "undo",
//                 "redo",
//                 "|",
//                 "MathType",
//                 "ChemType"
//               ]
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default Editor;
