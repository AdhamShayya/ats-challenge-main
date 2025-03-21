// types/pdf-parse.d.ts
declare module 'pdf-parse' {
    export default function pdfParse(data: Buffer): Promise<{ text: string }>;
  }