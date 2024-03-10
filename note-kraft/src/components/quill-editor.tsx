"use client";

import { memo, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { toast } from "./ui/use-toast";

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

interface QuillEditorInterface {
  onEditorChange: Function;
  content: string;
}

/**
 * Editor component for notes with file drag and drop support.
 */
function QuillEditor({ onEditorChange, content }: QuillEditorInterface) {
  const ReactQuill: any = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  // // State for storing editor HTML content
  // const [editorHtml, setEditorHtml] = useState<string>(
  //   `<p><span style="color: red; border: 1px solid black;">lol</span></p>`
  // );

  const quillRef = useRef<any>();

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

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="h-full"
    >
      <ReactQuill
        ref={quillRef as any}
        theme="snow"
        value={content}
        onChange={onEditorChange}
        className="h-full"
        modules={modules}
      />
    </div>
  );
}

export default memo(QuillEditor);
