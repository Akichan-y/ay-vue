function dummyFetch(path) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if (path.startsWith("/resource")) {
                resolve({ body: `Response body of ${path}` });
            } else {
                reject(new Error("NOT FOUND"));
            }
        }, 1000 * Math.random());
    });
}

// 複数のリソースを取得しレスポンスボディの配列を返す
async function fetchResources(resources) {
    // リソースをまとめて取得する
    const promises = resources.map(function(resource){
        return dummyFetch(resource);
    });
    // すべてのリソースが取得できるまで待つ
    // Promise.allは [ResponseA, ResponseB] のように結果が配列となる
    const responses = await Promise.all(promises);
    // 取得した結果からレスポンスのボディだけを取り出す
    return responses.map(function(response){
        return response.body;
    });
}
const resources = ["/resource/A", "/resource/B"];
// リソースを取得して出力する
fetchResources(resources).then(function(results){
    console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});