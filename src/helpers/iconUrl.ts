import { DeviconBranch, IconVersion } from "../types"

export const createDeviconJsonUrl = (branch: DeviconBranch) => {
    const branchMap: Record<DeviconBranch, string> = {
        'master': 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.json',
        'develop': `https://raw.githubusercontent.com/devicons/devicon/develop/devicon.json`
    }
    return branchMap[branch];
}

export const createDeviconIconUrl = (iconName: string, version: IconVersion, branch: DeviconBranch) => {
    const branchMap: Record<DeviconBranch, string> = {
        'master': `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-${version}.svg`,
        'develop': `https://raw.githubusercontent.com/devicons/devicon/${branch}/icons/${iconName}/${iconName}-${version}.svg`
    }
    return branchMap[branch];
}