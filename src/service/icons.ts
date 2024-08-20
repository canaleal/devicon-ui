import { createDeviconJsonUrl } from "../helpers/iconUrl"
import { DeviconBranch, IIcon } from "../types"

export const fetchIcons = async (deviconBranch: DeviconBranch): Promise<IIcon[]> => {
    const response = await fetch(createDeviconJsonUrl(deviconBranch))
    return response.json()
}
