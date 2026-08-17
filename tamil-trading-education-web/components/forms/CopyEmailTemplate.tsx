"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyEmailTemplateProps {
  to: string;
  cc: string[];
  subject: string;
  body: string;
}

export default function CopyEmailTemplate({ to, cc, subject, body }: CopyEmailTemplateProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const fullText = `To: ${to}\nCc: ${cc.join(", ")}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-xl2 border border-navy-600/20 bg-navy-100 p-3.5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-w-0 overflow-hidden">
      <p className="text-ink/45 mb-2 break-all">To: <span className="text-ink/85 font-semibold">{to}</span></p>
      <p className="text-ink/45 mb-2 break-all">Cc: <span className="text-ink/85 font-semibold">{cc.join(", ")}</span></p>
      <p className="text-ink/45 mb-4 break-words">Subject: <span className="text-ink/85 font-semibold">{subject}</span></p>
      <p className="text-ink/85 whitespace-pre-line break-words border-t border-ink/10 pt-4 text-[13px] sm:text-[15px]">{body}</p>
      <button
        onClick={handleCopy}
        className="mt-5 inline-flex items-center gap-2 text-sm font-heading font-bold text-gold-700 hover:text-gold-800 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" /> Copied
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" /> Copy Email Template
          </>
        )}
      </button>
    </div>
  );
}
