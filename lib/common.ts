import {gan, tiiki} from "../common/hospital";

export const getRegionAndCancerType = (router):[string, string] => {
    const filename = router.pathname.replace(/^.*\//, "")
    const pageRegion = tiiki[filename]
    const cancerName = router.pathname.split("\/")[3]
    const cancerType = gan[cancerName]
    return [pageRegion, cancerType]
}
