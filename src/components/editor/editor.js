import React from "react";
import TinyMCE from "react-tinymce";

const Editor = () => {
  const handleEditorChange = (e) => {
    console.log(e.target.getContent());
  };

  return (
    <TinyMCE
      content="<p>This is the initial content of the editor</p>"
      config={{
        plugins: "autolink link image lists print preview",
        toolbar: "undo redo | bold italic | alignleft aligncenter alignright",
      }}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
