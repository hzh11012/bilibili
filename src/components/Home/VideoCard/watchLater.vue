<template>
  <div class="watch-later-video watchlater black">
    <span id="wl-tips" class="wl-tips" style="left:-21px;">稍后再看</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.watch-later-video {
  opacity: 0;
  transition: opacity 0.2s;
  &:hover {
    .wl-tips {
      display: block;
    }
  }
}
.watchlater {
  position: absolute;
  z-index: 20;
  width: 22px;
  height: 22px;
  right: 8px;
  bottom: 8px;
  cursor: pointer;
  background-size: contain;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABT0lEQVQ4je3VMYrCQBTG8b/DWASLNKJgJ1hY2sloZeF2gkeYW+wZvIVXsLBJY5UdtLJLk17EIghCwChukWRxFzSaaLdfMwm8/EgemTclgOl02gEmwAAoky8RsAA+tdbrUoJ+AVZO8G9CoCeJ39Sq1+sopbBtO5e23+8xxrDdbi1gIog/vxAKYNs2Sqn0diBIenoP9X2fIAgyccv66WZZZBXvdjtc18UYkwlfJxM+n8+/1pfBefMPPw4LEZcEQcBqteJ0Or0GrlartFotLpcLnucxm83YbDbFYSEE/X6f4XBIpVLhcDjgOA6u63I8HvPDaRqNBuPxmHa7DcS7cT6f36yXj8IAUkq63S7NZpPlcomUtx9/Ck5Tq9UYjUZ3a976u0UQz9OiCcMwvYwk8XHyYYxBKXU9+p5Grybg4m1Hk9Bar4Ee4JC0JWeixOhprdffE/1yRW/TLMYAAAAASUVORK5CYII=);
  .wl-tips {
    display: none;
    position: absolute;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    line-height: 18px;
    padding: 4px 8px;
    background-color: #000;
    background: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    top: -30px;
  }
}
.black {
  width: 28px;
  height: 28px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAwFBMVEUAAAAGBgavr69EREQUFBQ1NTUODg7t7e3FxcV0dHRbW1sAAAAAAAAAAAD+/v77+/v4+Pj09PTj4+P8/PzV1dWpqamSkpIhISH19fXX19fLy8ulpaWdnZ1kZGRVVVUsLCz6+vrm5uba2tq9vb20tLSsrKyXl5eMjIx+fn54eHhsbGxpaWk+Pj4AAAAAAADv7+/e3t7AwMC3t7ehoaFLS0vo6OjR0dHOzs7CwsKCgoKCgoJiYmLp6enMzMywsLD////DVMIGAAAAP3RSTlOZmtOrnqec8927sopkEf38+ffu/eXPxqH45+DOyrWwpPvv6NnV0cjEv724t6qPAPTr2tbNru/j4tvAv7Tw4dTgAD9iAAABpElEQVRIx+ST13KCUBiEDyCCBRBQsaHGHrvp/Xv/twpDTBgRonjr3u0w38zu8h+xNsolkVGlsrEWxkpcoJUhyuISBVjpIi7Arli9bmE6mb0rUhZI6tZu2KuxK+TO5RYOB2pM8udgShWASlOXa8MnDYDN7DRX6AOVkf/bTemEqe9OdW0DluwdNH7VgKZ3knNUEVN+CGz/K3oLtJJGrJugp3MPFrSSy7wBnVRwAE7aTxuDq6YNCpaaehRN2KV8eoRaNMh8GesBKIlgEewoaAtTPoytw0gIXz4KJYMcORfQ5n/Wy4kuaMKHzzioQTFyhNJ7P27ZMNuSDb4Noxingi3FQSpTab8bWx0+YOMdV6yKIxAGSuCkZ6Dv9sEsJlzNSxKIex/ejgUkXkEdxokgLMJn4gBUpcygyH+BHYyVMWo4w/eMwXFIfOCgAVKiAxMQTgCYAH+S44MkOXRAOJGbYyRyHXU24rIVWgjqCNgbkZWRRYA+JrfoYKaksKK8eKS8QCZcBVBe6VBezRGuWGlalSMaD2KQxsMooCMgu6FLdtOa7MY82d0HAP3jZ1lFdjimAAAAAElFTkSuQmCC);
}
</style>