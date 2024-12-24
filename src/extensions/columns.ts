import { Node, mergeAttributes } from '@tiptap/core';

export const ColumnLayout = Node.create({
  name: 'columnLayout',

  group: 'block',

  content: 'columnBlock+',

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column-layout"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column-layout', style: 'display: flex; gap: 8px;' }), 0];
  },
});

export const ColumnBlock = Node.create({
  name: 'columnBlock',

  group: 'block',

  content: 'block+',

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'column-block', style: 'flex: 1;' }), 0];
  },
});
