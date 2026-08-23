"use client";

import { useState } from "react";
import { Group, Panel, Separator, usePanelRef } from "react-resizable-panels";
import Sidebar from "@/components/Sidebar";
import ResumeEditor from "@/components/ResumeEditor";
import PdfPreview from "@/components/PdfPreview";
import StatusBar from "@/components/StatusBar";
import ErrorLogger from "@/components/ErrorLogger";

const separatorClassName =
  "group relative w-2 flex-shrink-0 cursor-col-resize bg-transparent outline-none";

function SeparatorBar() {
  return (
    <Separator className={separatorClassName}>
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors group-hover:bg-accent" />
    </Separator>
  );
}

export default function Home() {
  const sidebarPanelRef = usePanelRef();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    const panel = sidebarPanelRef.current;
    if (!panel) return;
    // .expand()'s "restore to most recent size" is unreliable here, so
    // resize to an explicit known-good percentage instead.
    if (sidebarCollapsed) {
      panel.resize("20%");
      setSidebarCollapsed(false);
    } else {
      panel.resize("0%");
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg">
      <ErrorLogger />
      <StatusBar sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
      <Group orientation="horizontal" className="min-h-0 flex-1">
        <Panel
          id="sidebar"
          panelRef={sidebarPanelRef}
          collapsible
          collapsedSize="0%"
          minSize="16%"
          defaultSize="20%"
          maxSize="32%"
          onResize={(size) => setSidebarCollapsed(size.asPercentage === 0)}
        >
          <Sidebar />
        </Panel>
        <SeparatorBar />
        <Panel id="editor" minSize="20%">
          <ResumeEditor />
        </Panel>
        <SeparatorBar />
        <Panel id="preview" minSize="20%">
          <PdfPreview />
        </Panel>
      </Group>
    </div>
  );
}
