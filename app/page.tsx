import Sidebar from "@/components/Sidebar";
import ResumeEditor from "@/components/ResumeEditor";
import PdfPreview from "@/components/PdfPreview";

export default function Home() {
  return (
    <div className="grid h-full w-full grid-cols-[280px_1fr_1fr] overflow-hidden">
      <Sidebar />
      <ResumeEditor />
      <PdfPreview />
    </div>
  );
}
