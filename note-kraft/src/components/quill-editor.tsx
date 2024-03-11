"use client";

import { memo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "./ui/use-toast";
import { NoteAccessLevel } from "notekraft/types/note-access";
import { uploadFile } from "notekraft/services/uploader-service";
import ReactQuill from "react-quill";
import { useSession } from "next-auth/react";

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
  accessLevel: NoteAccessLevel;
}

/**
 * Editor component for notes with file drag and drop support.
 */
function QuillEditor({
  onEditorChange,
  content,
  accessLevel,
}: QuillEditorInterface) {
  const { data: session } = useSession();

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
        reader.onload = async () => {
          const range = quillRef.current?.getEditor().getSelection(true);
          const index = range ? range.index : 0;

          if (quillRef.current) {
            const fileURL = await uploadFile(
              file,
              session?.user.jwtToken ?? ""
            );
            if (file.type.startsWith("image/")) {
              quillRef.current.getEditor().insertEmbed(index, "image", fileURL);
            } else {
              const customImagePlaceholder = `<a href="${fileURL}" target="_blank">${file.name}</a>`;
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
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={(value) => onEditorChange(value)}
        className="h-full"
        modules={modules}
        readOnly={accessLevel === NoteAccessLevel.VIEWER}
      />
    </div>
  );
}

export default memo(QuillEditor);
