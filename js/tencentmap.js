// 1. 声明全局变量，存储IP定位结果，避免未定义报错
let ipLocation = null;

// 2. 腾讯地图IP定位get请求（异步）
// https://lbs.qq.com/
$.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    dataType: 'jsonp',
    jsonp: 'callback', 
    data: {
        key: 'UKZBZ-6PILQ-36Y5P-2XIUJ-T5WZ6-Q7BSD',
        output: 'jsonp'
    },
    success: function (res) {
        console.log('IP定位成功:', res);
        if (res.status === 0) {
            ipLocation = res;
            showWelcome();  // 成功后立即显示欢迎信息
        } else {
            console.error('IP定位失败:', res.message);
        }
    },
    error: function(xhr, status, error) {
        console.error('请求失败:', error);
    }
})

function getDistance(e1, n1, e2, n2) {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
        e *= PI / 180
        n *= PI / 180
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }

    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
}

function showWelcome() {

    let dist = getDistance(103.687000, 36.113000, ipLocation.result.location.lng, ipLocation.result.location.lat); 
    let pos = ipLocation.result.ad_info.nation;
    let ip;
    let posdesc;
    //根据国家、省份、城市信息自定义欢迎语
    switch (ipLocation.result.ad_info.nation) {   
        case "美国":
            posdesc = "The road keeps going.";
            break;
        case "英国":
            posdesc = "Tea is ready, take your time.";
            break;
        case "俄罗斯":
            posdesc = "Снег ещё не растаял.";
            break;
        case "法国":
            posdesc = "Le temps ralentit sous la lumière du soir.";
            break;
        case "德国":
            posdesc = "Die Zeit verging im Fluge.";
            break;
        case "意大利":
            posdesc = "Il sole cade sulle pietre antiche.";
            break;
        case "澳大利亚":
            posdesc = "The ocean is calling.";
            break;
        case "加拿大":
            posdesc = "Une feuille d’érable est tombée.";
            break;
        case "西班牙":
            posdesc = "La noche apenas comienza.";
            break;
        case "日本":
            posdesc = "風鈴が、そっと鳴った";
            break;
        case "韩国":
            posdesc = "바람이 만나고 산해를 건너, 반갑습니다!";
            break;
        case "中国":
            pos = ipLocation.result.ad_info.province + " " + ipLocation.result.ad_info.city + " " + ipLocation.result.ad_info.district;
            ip = ipLocation.result.ip;
            switch (ipLocation.result.ad_info.province) {
                case "北京市":
                    posdesc = "钟声未远，故事仍在继续。";
                    break;
                case "上海市":
                    posdesc = "灯还亮着，夜色正好。";
                    break;
                case "天津市":
                    posdesc = "海风拂过，茶香未散。";
                    break;
                case "重庆市":
                    posdesc = "雾起山城，路向上生长。";
                    break;
                case "河北省":
                    posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
                    break;
                case "山西省":
                    posdesc = "窑火不灭，夜色很深。";
                    break;
                case "辽宁省":
                    posdesc = "海很近，工业很重。";
                    break;
                case "吉林省":
                    posdesc = "林深雪厚，夜很安静。";
                    break;
                case "黑龙江省":
                    posdesc = "雪落无声，灯却很暖。";
                    break;
                case "江苏省":
                    posdesc = "水慢慢流，话也慢慢说。";
                    break;
                case "浙江省":
                    posdesc = "东风渐绿西湖柳，雁已还人未南归。";
                    break;
                case "安徽省":
                    posdesc = "山影入墨，天色微淡。";
                    break;
                case "福建省":
                    posdesc = "井邑白云间，岩城远带山。";
                    break;
                case "江西省":
                    posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
                    break;
                case "山东省":
                    posdesc = "风从海来，人讲分量。";
                    break;
                case "河南省":
                    posdesc = "黄河远上白云间，一片孤城万仞山。";
                    break;
                case "湖北省":
                    posdesc = "水面开阔，天色翻涌。";
                    break;
                case "湖南省":
                    posdesc = "山不说话，火却很旺。";
                    break;
                case "广东省":
                    posdesc = "早茶未凉，生活正忙。";
                    break;
                case "海南省":
                    posdesc = "朝观日出逐白浪，夕看云起收霞光。";
                    break;
                case "四川省":
                    posdesc = "云低下来，日子变软。";
                    break;
                case "贵州省":
                    posdesc = "雾散得慢，酒却很快。";
                    break;
                case "云南省":
                    posdesc = "风穿过高原，花开得自由。";
                    break;
                case "陕西省":
                    posdesc = "城墙很厚，夜色很静。";
                    break;
                case "甘肃省":
                    posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
                    break;
                case "青海省":
                    posdesc = "湖面如镜，世界很大。";
                    break;
                case "台湾省":
                    posdesc = "我在这头，大陆在那头。";
                    break;
                case "内蒙古自治区":
                    posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
                    break;
                case "广西壮族自治区":
                    posdesc = "山在水中，水在山里。";
                    break;
                case "西藏自治区":
                    posdesc = "天空很近，脚步很轻。";
                    break;
                case "宁夏回族自治区":
                    posdesc = "大漠孤烟直耸，长河落日圆。";
                    break;
                case "新疆维吾尔自治区":
                    posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
                    break;
                case "香港特别行政区":
                    posdesc = "霓虹很亮，夜从不等人。";
                    break;
                case "澳门特别行政区":
                    posdesc = "灯影摇晃，时间放慢。";
                    break;
                default:
                    posdesc = "带我去你的城市逛逛吧！";
                    break;
            }
            break;
        default:
            posdesc = "带我去你的国家逛逛吧。";
            break;
    }

    //根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "天色渐亮，世界慢慢醒来。";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "阳光正好，时间不必太快。";
    else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "午后很轻，思绪正散开。";
    else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "时光静好，悠然自得。";
    else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "黄昏在靠近，风开始变软。";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "夜色已深，灯还亮着。";
    else timeChange = "夜深了，早点休息，少熬夜。";

    try {
        //自定义文本和需要放的位置
        document.getElementById("welcome-info").innerHTML = `
            <div style="font-weight:700;">
                <div style="text-align:center;margin-bottom:6px;">
                🎉 欢迎信息 🎉
                </div>
                欢迎来自 
                <span style="color:#49b1f5;font-weight:700;">${pos}</span> 的小伙伴，
                ${timeChange}
                您现在距离站长约 
                <span style="color:#49b1f5;font-weight:700;">${dist}</span> 公里，
                ${posdesc}
            </div>
        `;
            // `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color, #49b1F5)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color, #49b1F5)">${dist}</span> 公里， ${posdesc}</b>`;
    } catch (err) {
        // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
    }
}

// window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
// document.addEventListener('pjax:complete', showWelcome);