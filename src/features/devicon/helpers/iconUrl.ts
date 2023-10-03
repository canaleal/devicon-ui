import { DeviconBranch, Version } from "../types"

export const createDeviconJsonUrl = (branch: DeviconBranch) => {
    const baseUrl = `https://raw.githubusercontent.com/devicons/devicon/${branch}`
    return `${baseUrl}/devicon.json`
}

export const createDeviconIconUrl = (iconName: string, version: Version, branch: DeviconBranch) => {
    let baseUrl = '';
    if (branch === 'master') {
        baseUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons`
    }
    else if (branch === 'develop') {
        baseUrl = `https://raw.githubusercontent.com/devicons/devicon/${branch}/icons`
    }
    return `${baseUrl}/${iconName}/${iconName}-${version}.svg`
}