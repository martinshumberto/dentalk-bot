<template>
  <div 
    :style="arrowStyle" 
    class="moving-arrow"/>
</template>
<script>
export default {
    props: {
        moveY: {
            type: Number,
            default: 0
        }
    },
    computed: {
    /**
     * Styles to animate the arrow
     * @returns {{transform: string}}
     */
        arrowStyle() {
            return {
                transform: `translate3d(-50px, ${this.moveY}px, 0px)`
            };
        }
    }
};
</script>
<style lang="scss">
$bg-nude: #f4f3ef !default;

.moving-arrow {
  width: 200px;
  height: 50px;
  display: flex;
  position: absolute;
  left: 80px;
  top: 120px;
  border-radius: 50px;
  background: #238aff;
  transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1);
  z-index: -1;
-webkit-box-shadow: 0px 10px 30px -11px rgba(35,138,255,1);
-moz-box-shadow: 0px 10px 30px -11px rgba(35,138,255,1);
box-shadow: 0px 10px 30px -11px rgba(35,138,255,1);
}
@media (max-width: 992px) {
  .moving-arrow {
    display: none;
  }
}
</style>
