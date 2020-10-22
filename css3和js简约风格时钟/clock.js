window.onload = function () {
    var hr = document.getElementsByClassName("hr")[0];
    var mn = document.getElementsByClassName("mn")[0];
    var sc = document.getElementsByClassName("sc")[0];

    function mytime() {
        var date = new Date();

        // 小时 分钟 秒钟

        // 360deg 12小时 360÷12=30
        // getHours 0~23  一个小时30度
        var hh = date.getHours() * 30;
        // getMinutes 0~59  360÷60=6
        var mm = date.getMinutes() * 6;
        // 0~59
        var ss = date.getSeconds() * 6;

        // js控制css
        hr.style.transform = `rotate(${hh + mm / 12}deg)`;
        mn.style.transform = `rotate(${mm}deg)`;
        sc.style.transform = `rotate(${ss}deg)`;
    }
    setInterval(() => {
        mytime();
    }, 1000);
}
