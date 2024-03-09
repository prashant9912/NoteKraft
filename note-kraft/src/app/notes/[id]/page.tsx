import { NotesEditor } from "notekraft/components/notes-editor";

export default function Page({ params }: { params: { id: string } }) {
  return <div>My Post: {params.id}</div>;
}

// export default function NotesComponent() {
//   return <NotesEditor />;
// }
