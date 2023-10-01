import {IVersionStyle, IIcon, Version } from "../types"


export const getIconCategories = (icons: IIcon[]) => {
    const categories: IVersionStyle[] = []
    icons.forEach((icon: IIcon) => {
        const items: string[] = icon.versions.svg
        items.forEach((item: string) => {
            const category = categories.find(category => category.versionName === item);
            if (category) {
                category.numberOfIcons++;
            } else {
                categories.push({ versionName: item as Version, numberOfIcons: 1, isSelected: false });
            }
        });
    });

    return categories;
}