import { useEffect } from "react";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { sections } from "./Navbar";
import { profile, resumeDownloadName, resumeUrl } from "@/data/portfolio";
import { scrollToTarget } from "@/lib/scroll";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const go = (id: string) => {
    onOpenChange(false);
    window.setTimeout(() => scrollToTarget(id), 40);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to a section or run a command..." />
      <CommandList>
        <CommandEmpty>No matching command.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {sections.map((section) => (
            <CommandItem key={section.id} value={section.label} onSelect={() => go(section.id)}>
              {section.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            value="Copy email"
            onSelect={() => {
              void navigator.clipboard.writeText(profile.email);
              toast.success("Email copied", { description: profile.email });
              onOpenChange(false);
            }}
          >
            Copy email address
          </CommandItem>
          <CommandItem value="Ask the AI assistant" onSelect={() => go("chat")}>
            Open the portfolio chat
          </CommandItem>
          <CommandItem
            value="Download CV"
            onSelect={() => {
              const link = document.createElement("a");
              link.href = resumeUrl;
              link.download = resumeDownloadName;
              link.click();
              onOpenChange(false);
            }}
          >
            Download CV
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}