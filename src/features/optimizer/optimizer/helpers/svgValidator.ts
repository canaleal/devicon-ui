
export const isValidSVG = (svg: string): boolean => {
    return svg.includes('<svg') && svg.includes('</svg>');
}