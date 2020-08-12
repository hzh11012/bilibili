//视频时间过滤器 。将秒转化成 hh:mm:ss/mm:ss 格式
let setTime = function (val) {
    if (!val) return "00:00";

    let hou = parseInt(val / 3600);
    if (hou < 10) {
        hou = '0' + hou;
    }
    let min = parseInt(val % 3600 / 60);
    if (min < 10) {
        min = "0" + min;
    }
    let sec = parseInt(val % 3600 % 60);
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (hou!=0) {
        val = `${hou}:${min}:${sec}`;
    }else{
        val = `${min}:${sec}`;
    }
    return val;
}
export { setTime }

let compareDate = (timestamp, day = 0) => {
    // timestamp 为要传入的时间戳
    // day 为要减去的日子 因为比较*当天*的话，是不需要减的，所以默认定义成0,

    // 根据上面分析，有些需要参数`time`，有些不需要，所以使用一个函数来区分一下 
    let newDate = (time = null) => {
        return time === null ? new Date() : new Date(time)
    }

    // 这里返回 比较后的值，比较成功，则返回`true`，失败则返回`false`
    return (newDate(timestamp).getDate() == newDate().getDate() - day) && (newDate(timestamp).getMonth() == newDate().getMonth()) && (newDate(timestamp).getYear() == newDate().getYear())
}

export { compareDate }


//数字过滤器 大于1w +万字
let setNum = function (val) {
    if (!val) return 0;
    let num = val;
    if (val >= 10000) {
        num = (num / 10000).toFixed(1) + '万'
        return num
    } else {
        return num;
    }

}
export { setNum }