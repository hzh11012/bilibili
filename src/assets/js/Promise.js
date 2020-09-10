/* 
    自定义promise模块
*/

(function (window) {
    //Promise构造函数
    function Promise(executor) {
        //状态
        this.status = 'pending';
        this.data = undefined;
        this.callbacks = [];

        function resolve(res) {
            this.status = 'resolved';
            this.data = res;

            if (this.callbacks.length > 0) {
                
            }
        }

        function reject(params) {

        }

        //立即同步执行executor
        executor(resolve, reject);
    }

    //Promise原型对象的then()
    // 
    Promise.prototype.then = function (onResolved, onRejected) {

    }

    //Promise原型对象的catch()
    Promise.prototype.catch = function (onRejected) {

    }

    //Promise函数对象resolve方法
    Promise.resolve = function (res) {

    }

    //Promise函数对象reject方法
    Promise.reject = function (err) {

    }

    //Promise函数对象all方法
    Promise.all = function (promises) {

    }
    //Promise函数对象race方法
    Promise.race = function (promises) {

    }



    //向外暴露Promise函数
    window.Promise = Promise;
})(window);