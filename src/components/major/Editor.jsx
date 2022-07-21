// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, Editor } from "draft-js";

function EditorComponent() {
  return <Editor editorState={editorState} onChange={setEditorState} />;
}
export default EditorComponent;
