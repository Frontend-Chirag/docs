import { createLowlight, all } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import java from 'highlight.js/lib/languages/java';

const lowlight = createLowlight(all);
lowlight.register('javascript', js);
lowlight.register('typescript', ts);
lowlight.register('cpp', cpp);
lowlight.register('csharp', csharp);
lowlight.register('java', java);

// Configure the code block extension
export const CodeBlockExtension = CodeBlockLowlight.configure({ lowlight });