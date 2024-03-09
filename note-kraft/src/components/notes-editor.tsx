"use client";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "./ui/use-toast";

// Define modules for Quill editor toolbar
const modules: Record<string, any> = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: ["red", "#785412"] }],
  ],
};

/**
 * Editor component for notes with file drag and drop support.
 */
export function NotesEditor(): JSX.Element {
  // State for storing editor HTML content
  const [editorHtml, setEditorHtml] = useState<string>(
    `<p><span style="color: red; border: 1px solid black;">lol</span></p>`
  );
  const quillRef = useRef<ReactQuill>();

  /**
   * Handles file drop event for inserting images or files into the editor.
   * @param e - The drop event.
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith("image/") || file.size <= 10 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          const range = quillRef.current?.getEditor().getSelection(true);
          const index = range ? range.index : 0;
          if (quillRef.current) {
            if (file.type.startsWith("image/")) {
              quillRef.current
                .getEditor()
                .insertEmbed(index, "image", reader.result);
            } else {
              const customImagePlaceholder = `<em><img src="./file.png" style="width: 70px;"/>${file.name}</em><p><br /></p>`;
              quillRef.current
                .getEditor()
                .clipboard.dangerouslyPasteHTML(
                  index,
                  customImagePlaceholder,
                  "user"
                );
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "File size exceeds 10Mb",
          variant: "destructive",
        });
      }
    }
  };

  /**
   * Handles editor content change event.
   * @param html - The new HTML content of the editor.
   */
  const handleChange = (html: string): void => {
    setEditorHtml(html);
  };

  useEffect(() => {
    console.log(editorHtml);
  }, [editorHtml]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="h-full"
    >
      <ReactQuill
        ref={quillRef as any}
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        className="h-full"
        modules={modules}
      />
    </div>
  );
}
