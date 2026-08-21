import Sidebar from "@/components/Sidebar";
import ResumeEditor from "@/components/ResumeEditor";
import PdfPreview from "@/components/PdfPreview";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg">
      <StatusBar />
      <div className="grid min-h-0 flex-1 grid-cols-[280px_1fr_1fr] divide-x divide-border overflow-hidden">
        <Sidebar />
        <ResumeEditor />
        <PdfPreview />
      </div>
    </div>
  );
}
