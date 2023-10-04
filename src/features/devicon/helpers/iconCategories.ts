import {ICategory, IIcon, IconVersion } from "../types"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValueFromPath = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);


export const getIconCategories = (icons: IIcon[], path: string = 'versions.svg') => {
    const categories: ICategory[] = [];
    
    icons.forEach((icon: IIcon) => {
        const items: string[] = [...getValueFromPath(icon, path)];
        items.forEach((item: string) => {
            const category = categories.find(category => category.categoryName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                categories.push({ categoryName: item as IconVersion, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    return categories;
}