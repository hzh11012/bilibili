
export function get(url, params) {
    return new Promise((resolve, reject) => {
        this.$http.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err)
        })
    })
}