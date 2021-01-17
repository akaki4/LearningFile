"use script";

{
  function sortByLength(array) {
    array.sort();
    let b = array.sort((a, b) => {
      return b.length < a.length ? -1 : 1;
    });
    return b;
  }

  console.log(sortByLength(["eeeee", "aa", "gggg"]));
  console.log(sortByLength(["Taro", "Jiro", "Saburo"]));
}
