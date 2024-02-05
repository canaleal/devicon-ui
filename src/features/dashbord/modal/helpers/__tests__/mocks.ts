import { IIcon } from "../../../../../types";

export const MOCK_EXAMPLE_ICON: IIcon = {
    name: 'example',
    altnames: ['example-alt'],
    tags: ['example-tag'],
    versions: {
        svg: ['plain', 'line', 'original', 'plain-wordmark', 'line-wordmark', 'original-wordmark'],
        font: ['plain', 'line', 'line-wordmark', 'plain-wordmark']
    },
    color: '#000000',
    aliases: [
        {
            base: 'plain',
            alias: 'line'
        }
    ]
};