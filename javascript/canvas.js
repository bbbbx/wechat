var canvas = document.getElementById("canvas");
canvas.width = 1080;
canvas.height = 1920;
var context = canvas.getContext("2d");
context.fillStyle = "#ebebeb"
context.fillRect(0, 0, canvas.width, canvas.height)
drawBackground(context)

/**
 * 画我的气泡
 * @param cxt   [画笔]
 * @param x    [气泡左上角顶点X]
 * @param y    [气泡左上角顶点Y]
 * @param w    [气泡宽度]
 * @param h    [气泡高度]
 * @param r    [气泡圆角半径]
 */
function drawMychat(cxt, x, y, w, h, r) {
    cxt.save()
    cxt.beginPath()
    cxt.arc(x + r, y + r, r, 1.0 * Math.PI, 1.5 * Math.PI)
    cxt.lineTo(x + w - r, y)
    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2.0 * Math.PI)
    cxt.lineTo(x + w, y + r + 32)
    cxt.lineTo(x + w + 16, y + r + 32 + 16)
    cxt.lineTo(x + w, y + r + 32 + 16 + 16)
    cxt.lineTo(x + w, y + h - r)
    cxt.arc(x + w - r, y + h - r, r, 2.0 * Math.PI, 0.5 * Math.PI)
    cxt.lineTo(x + r, y + h)
    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1.0 * Math.PI)
    cxt.lineTo(x, y + r)
    cxt.closePath()
    cxt.restore()

    cxt.lineWidth = 1
    cxt.strokeStyle = "#73c03e"
    cxt.fillStyle = "#9fe658"
    cxt.fill()
    cxt.stroke()
}

/**
 * 画对方的气泡
 * @param cxt   [画笔]
 * @param x    [气泡左上角顶点X]
 * @param y    [气泡左上角顶点Y]
 * @param w    [气泡宽度]
 * @param h    [气泡高度]
 * @param r    [气泡圆角半径]
 */
function drawHischat(cxt, x, y, w, h, r) {
    cxt.save()
    cxt.beginPath()
    cxt.arc(x + r, y + r, r, 1.0 * Math.PI, 1.5 * Math.PI)
    cxt.lineTo(x + w - r, y)
    cxt.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2.0 * Math.PI)
    cxt.lineTo(x + w, y + h - r)
    cxt.arc(x + w - r, y + h - r, r, 2.0 * Math.PI, 0.5 * Math.PI)
    cxt.lineTo(x + r, y + h)
    cxt.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1.0 * Math.PI)
    cxt.lineTo(x, y + r + 32 + 16 + 16)
    cxt.lineTo(x - 16, y + r + 32 + 16)
    cxt.lineTo(x, y + r + 32)
    cxt.lineTo(x, y + r)
    cxt.closePath()
    cxt.restore()

    cxt.lineWidth = 1
    cxt.strokeStyle = "#d7d7d7"
    cxt.fillStyle = "#fff"
    cxt.fill()
    cxt.stroke()
}

/**
 * 手机界面
 * @param cxt   [画笔]
 */
function drawBackground(cxt) {

    var background = new Image()
    background.src = './image/background.png'
    background.onload = function () {
        cxt.drawImage(background, 0, 0 , canvas.width , canvas.height)
    }
}

/**
 * 点击生成后的聊天记录
 * @param cxt   [画笔]
 */
function generate(cxt) {
    //清屏canvas后再画上背景
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.fillStyle = "#ebebeb"
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    var background = new Image()
    background.src = './image/background.png'
    cxt.drawImage(background, 0, 0 ,canvas.width , canvas.height)

    //对方姓名
    var hisName = document.getElementById('hisName')
    cxt.beginPath()
    cxt.font = 'bold 58px 黑体';
    cxt.textBaseline = 'top'
    cxt.fillStyle = '#fff'
    cxt.fillText(hisName.value, 182, 120)

    var chk = new Array(8)
    var select = new Array(8)
    var content = new Array(8)
    var dis = 0//气泡上边距

    for (var i = 1; i < 9; i++) {
        chk[i] = document.getElementById('chk' + i);
        select[i] = document.getElementById('select' + i)
        content[i] = document.getElementById('cnt' + i)

        if (i == 1) {
            dis = 220 + 40;//第一条气泡的y：220px的状态栏 + 40px的边距
        } else {
            dis = dis + (Math.ceil(cxt.measureText(content[i-1].value).width / (52*13)) * (52 + 17)) + 2*36 + 38;//之后的气泡的y：之前的气泡的y + 前一个气泡高度 + 38px的气泡间隔
        }

        // 如果复选框被勾了
        if (chk[i].checked) {
            var index = select[i].selectedIndex//index为下拉选择框的选项索引值，0：我，1：对方
            if (index == 0) {
                drawMyMessage(cxt, content[i].value, dis)
            } else {
                drawHisMessage(cxt, content[i].value, dis)
            }
        }
    }
}

function drawMyMessage(cxt, msg, y) {
    //绘画头像
    cxt.beginPath();
    var myHead = new Image();
    myHead.src = document.getElementById('imgHead1').src;
    myHead.onload = function () {
        cxt.drawImage(myHead, 1080 - 24 - 120, y, 120, 120);
    }

    cxt.beginPath();
    cxt.font = '52px 黑体';
    cxt.textBaseline = 'top'
    var msgLength = cxt.measureText(msg).width;
    var count = parseInt(msgLength / (52*13)) * (52 + 17)//根据信息长度计算气泡的额外高度
    console.log(msgLength)
    drawMychat(cxt, 1080 - 120 - 24 - 27 - 2 * 18 - (msgLength >= 52 * 13 ? 52 * 13 : msgLength), y, (msgLength >= 52 * 13 ? 52 * 13 : msgLength) + 2*18 ,  119+count, 10);
    cxt.fillStyle = 'black'
    //cxt.fillText(msg , 1080 - 120 - 24 - 27 - 18 - (msgLength >= 52 * 13 ? 52 * 13 : msgLength), y + 36)
    drawText(cxt, msg , 1080 - 120 - 24 - 27 - 18 - (msgLength >= 52 * 13 ? 52 * 13 : msgLength), y + 36)
}

function drawHisMessage(cxt, msg, y) {
    cxt.beginPath();
    var hisHead = new Image();
    hisHead.src = document.getElementById('imgHead2').src;
    hisHead.onload = function () {
        cxt.drawImage(hisHead, 24, y, 120, 120);
    }

    cxt.beginPath();
    cxt.font = '52px 黑体';
    cxt.textBaseline = 'top'
    var msgLength = cxt.measureText(msg).width;
    var count = parseInt(msgLength / (52*13)) * (52 + 17)//根据信息长度计算气泡的额外高度

    drawHischat(cxt, 120 + 24 + 27, y, (msgLength >= 52 * 13 ? 52 * 13 : msgLength) + 2 * 18, 119 + count, 10);
    cxt.fillStyle = 'black'
    drawText(cxt, msg , 120 + 24 + 27 + 18, y + 36)
}

/**
 * 填充文本，文本每行的长度为 （52 * 12.5）至 （52 * 13） 像素
 * @param cxt   [画笔]
 * @param msg   [文本信息]
 * @param x     [文本的左上角坐标X]
 * @param y     [文本的左上角坐标Y]
 */
function drawText(cxt, msg , x , y) {
    var linelenght = 52 * 12.5;//文本的行宽为 52*12.5 像素
    var text = "";
    var msgLength = cxt.measureText(msg).width;
    var newtext = msg.split("");
    cxt.beginPath()
    cxt.font = '52px 黑体';
    cxt.textBaseline = 'top'
    cxt.fillStyle = 'black'

    for (var i = 0; i <= msgLength; i +=26) {
        if (cxt.measureText(text).width >= linelenght)//当text的宽度大于等于行的长度时，填充text
        {
            cxt.fillText(text, x, y);
            y = y + 52 + 17;//文本大小为52px，再加上行间距17px
            text = "";//初始化text
        }
        if (newtext[0] == null) {//当newtext[0]为空时，表明后面已没有信息，填充最后的信息后跳出循环
            cxt.fillText(text, x, y)
            break;
        }

        var text = text + newtext[0];//将拆分后的newtext数组依次赋值给text
        newtext.shift();//删除newtext数组的第一个元素
    }
}
