window.onload = function () {
  var cart_btns,
    cart_cnt_icon,
    clicked, //クリックされたカートアイコンのインデックス
    save_items, //ローカルストレージ保存用の配列
    cart_cnt, //カートのアイテム数
    items;
  function cart_active() {
    cart_btns = document.querySelectorAll(".js_cart_btn"); //カートボタン
    cart_cnt_icon = document.getElementById("js_cart_cnt");
    clicked = [];
    save_items = []; //カートの個数アイコン
    cart_cnt = 0;
    items = JSON.parse(localStorage.getItem("items")); //ローカルストレージの商品データ配列
    // すでにカートに商品が入っている場合、カートアイコンのカウント表示とカートボタンをアクティブにする
    if (items) {
      var id;
      for (var i = 0; i < items.length; i++) {
        id = items[i].id;
        save_items.push(items[i]);
        clicked.push(id);
        activate_btn(id);
      }

      if (items.length != 0) {
        cart_cnt_icon.parentNode.classList.remove("hidden");
        cart_cnt_icon.innerHTML = cart_cnt;
      }
    }

    // カートボタンを押した際の処理
    cart_btns.forEach(function (cart_btn, index) {
      cart_btn.addEventListener("click", function () {
        // カートボタンがすでに押されているかの判定
        if (clicked.indexOf(index) >= 0) {
          for (var i = 0; i < clicked.length; i++) {
            if (clicked[i] == index) {
              clicked.splice(i, 1);
              save_items.splice(i, 1);
            }
          }

          inactivate_btn(index);
        } else if (clicked.indexOf(index) == -1) {
          var name = cart_btn.dataset.name, //商品の名前を取得
            price = Number(cart_btn.dataset.price); //商品の値段を取得

          clicked.push(index);
          save_items.push({
            id: index,
            name: name,
            price: price,
          });

          activate_btn(index);
        }

        // ローカルストレージに商品データを保管
        localStorage.setItem("items", JSON.stringify(save_items));
      });
    });
  }

  cart_active();

  function activate_btn(index) {
    cart_cnt++;
    if (cart_cnt >= 1) {
      cart_cnt_icon.parentNode.classList.remove("hidden");
    }
    cart_cnt_icon.innerHTML = cart_cnt;
    cart_btns[index].classList.add("item_cart_btn_active");
  }

  function inactivate_btn(index) {
    cart_cnt--;
    if (cart_cnt == 0) {
      cart_cnt_icon.parentNode.classList.add("hidden");
    }
    cart_cnt_icon.innerHTML = cart_cnt;
    cart_btns[index].classList.remove("item_cart_btn_active");
  }

  // 検索ボタンを押した際、検索結果を表示
  $("#search-btn").on("click", () => {
    var searchResult,
      searchText = $("#search-text").val(), // 検索ボックスに入力された値
      targetText,
      hitNum;

    // 検索結果を格納するための配列を用意
    searchResult = [];

    // 検索結果エリアの表示を空にする
    $("#search-result__list").empty();
    $(".search-result__hit-num").empty();

    // 検索ボックスに値が入ってる場合
    if (searchText != "") {
      $(".item_wrapper li").each(function (i, element) {
        console.log($(this).parent().children().html());
        targetText = $(this).text();

        // 検索対象となるリストに入力された文字列が存在するかどうかを判断
        if (targetText.indexOf(searchText) != -1) {
          // 存在する場合はそのリストのテキストを用意した配列に格納
          searchResult.push($(this).html());
        }
      });

      // 検索結果をページに出力
      for (var i = 0; i < searchResult.length; i++) {
        $("<div class='search-item'>")
          .html(searchResult[i])
          .appendTo("#search-result__list");
      }

      // ヒットの件数をページに出力
      hitNum =
        "<span>検索結果</span>：" + searchResult.length + "件見つかりました。";
      $(".search-result__hit-num").append(hitNum);
    }
    $("item_cart_btn").on("click", () => {});
  });
};
