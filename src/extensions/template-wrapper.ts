import { Node, mergeAttributes } from "@tiptap/core";
export const TemplateNode = Node.create({
    name: 'template',
    group: 'block',
    content: 'block*',

    addAttributes() {
        return {
            templateType: {
                default: null,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div.template-wrapper',
                getAttrs: dom => ({ templateType: dom.classList[1] }),
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes({ class: `template-wrapper ${HTMLAttributes.templateType}` }),
            0,
        ]
    },

});
