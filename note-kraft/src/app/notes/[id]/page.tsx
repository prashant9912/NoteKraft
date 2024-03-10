import { NotesEditor } from "notekraft/components/notes-editor";

export default function Page({ params }: { params: { id: string } }) {
  return <NotesEditor />;
}
