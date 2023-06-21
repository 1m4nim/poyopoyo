(function () {
    var elements = document.getElementsByClassName("drag-and-drop");

    var x;
    var y; //クリックされた位置を取得してるらしい...

    //マウスが要素内で押されたときタッチされたとき
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    }
    //マウスが押されたときの関数
    function mdown(e) {
        
        //クラス名に.dragを追加
        this.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収？？？？
        if (e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }
        //要素内の相対座標を取得？？？
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);

        //マウスカーソルが動いたとき
        function mmove(e) {

            //ドラッグしている要素を取得
            var drag = document.getElementsByClassName("drag")[0];

            //同様にマウスとタッチの差異を吸収
            if (e.type === "mousemove") {
                var event = e;
            } else {
                var event = e.changedTouches[0];
            }


            //フリックしたときに画面を動かさないようにデフォルト動作を抑制？？？
            e.preventDefault();

            //マウスが動いたときに要素を動かす
            drag.style.top = event.pageY - y + "px";
            drag.style.left = event.pageX - x + "px";

            //マウスが離されたとき、カーソルが外れたとき
            drag.addEventListener("mouseup", mup, false);
            document.body.addEventListener("mouseleave", mup, false)
            drag.addEventListener("touchend", mup, false);
            document.body.addEventListener("touchleave", mup, false);
        }


        //マウスボタンが上がったら
        function mup(e) {
            var drag = document.getElementsByClassName("drag")[0];

            //ムーブベントハンドラの消去
            document.body.removeEventListener("mousemove", mmove, false);
            drag.removeEventListener("mouseup", mup, false);
            document.body.removeEventListener("touchmove", mmove, false);
            drag.removeEventListener("touchend", mup, false);

            //クラス名.dragを消す
            drag.classList.remove("drag");
        }
    }
})()