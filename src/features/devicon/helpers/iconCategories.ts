import { ICategory, IIcon, Version } from "../types"


export const getIconVersionCategories = (icons: IIcon[]) => {
    const categories: ICategory[] = []
    icons.forEach((icon: IIcon) => {
        icon.versions.svg.forEach((version: string) => {
            const category = categories.find(category => category.versionType === version)
            if (category) {
                category.numberOfIcons++
            } else {
                categories.push({ versionType: version as Version, numberOfIcons: 1 })
            }
        })
    })

    return categories
}

export const getIconTagCategories = (icons: IIcon[]) => {
    const categories: ICategory[] = []
    icons.forEach((icon: IIcon) => {
        icon.tags.forEach((tag: string) => {
            const category = categories.find(category => category.versionType === tag)
            if (category) {
                category.numberOfIcons++
            } else {
                categories.push({ versionType: tag as Version, numberOfIcons: 1 })
            }
        })
    })

    return categories
}