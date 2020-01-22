import Axios from "axios";

export const liveSearch = async (query) => {
    let cancelToken;

    if (cancelToken)
        cancelToken.cancel()

    cancelToken = Axios.CancelToken.source().token;

    try {
        let res = await Axios.get(query, { cancelToken })
        return res.data
    } catch (error) {
        if (Axios.isCancel(error))
            console.log("Request Cancelled", error)
        else
            console.log("Something went wrong", error)
    }
}
