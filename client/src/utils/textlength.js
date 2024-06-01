const textLength = (data, DataLength) => {
    return data.length > DataLength ? `${data.substring(0, DataLength)}...` : data
}

export default textLength;