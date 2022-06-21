<template>
  <div class="viewport">
    <svg viewBox="0 0 323 272" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="js--eclipse"
        d="M311.95 248.909c-15.066 20.084-45.502 25.845-82.759 18.68-37.221-7.158-81.074-27.193-122.715-58.43-41.641-31.236-73.148-67.729-90.436-101.46-17.305-33.764-20.292-64.596-5.226-84.68C25.878 2.934 56.316-2.827 93.574 4.339c37.22 7.157 81.072 27.193 122.714 58.429 41.641 31.236 73.148 67.73 90.436 101.46 17.305 33.764 20.292 64.596 5.226 84.681Z"
        stroke="#666" />
    </svg>
    <div v-for="item in items" :key="item.id" :id="item.id" class="item-container" :class="{ active: item.isActive }">
      <div class="circle" :style="`background-color: ${item.color}`"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.viewport {
  width: 100%;
  max-width: 480px;
  margin: auto;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  padding: 5% 0 5% 5%;
}

svg {
  width: 120%;
  left: 0;
  top: 0;
}

.item-container {
  width: 100px;
  height: 100px;
  position: absolute;

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}
</style>
<script>
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js"
gsap.registerPlugin(MotionPathPlugin)
export default {
  data() {
    return {
      isSliding: false,
      positions: {
        active: 0.55,
        inActive: 0.1,
        hidden: 0
      },
      active: 0,
      items: [
        {
          id: 'item1',
          color: 'red',
          position: 0,
          isActive: true,
        },
        {
          id: 'item2',
          color: 'orange',
          position: 0,
          isActive: false,
        },
        {
          id: 'item25',
          color: 'yellow',
          position: 0,
          isActive: false,
        },
        {
          id: 'item3',
          color: 'green',
          position: 0,
          isActive: false,
        },
        {
          id: 'item4',
          color: 'blue',
          position: 0,
          isActive: false,
        },
        {
          id: 'item5',
          color: 'brown',
          position: 0,
          isActive: false,
        },
        {
          id: 'item6',
          color: 'violet',
          position: 0,
          isActive: false,
        },
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.setPosition()
      this.registerEvent()
    },
    setPosition() {
      const active = this.items[this.active]
      this.move(active, this.positions.active)
      const next = this.items[this.active + 1] || this.items[0]
      this.move(next, this.positions.inActive)
      this.items.forEach(item => {
        if (item !== active && item !== next) {
          this.move(item, this.positions.hidden)
        }
      });
    },
    slide(margin) {
      if (this.isSliding) return
      margin > 0 ? this.slideNext() : this.slidePrev()
    },
    slideNext() {
      this.items[this.active].isActive = false
      this.active = (this.active + 1) % this.items.length
      if (this.active >= this.items.length) this.active = 0
      const active = this.items[this.active]
      active.isActive = true
      this.move(active, this.positions.active)
      const next = this.items[this.active + 1] || this.items[0]
      this.move(next, this.positions.inActive)
      const prev = this.items[this.active - 1] || this.items[this.items.length - 1]
      this.move(prev, this.positions.hidden + 1)
    },
    slidePrev() {
      this.items[this.active].isActive = false
      this.active = this.active - 1
      if (this.active < 0) this.active = this.items.length - 1
      const active = this.items[this.active]
      active.isActive = true
      this.move(active, this.positions.active - 1)
      const prev = this.items[this.active + 1] || this.items[0]
      this.move(prev, this.positions.inActive)
      const prev2 = this.items[(this.active + 2) % this.items.length]
      this.move(prev2, this.positions.hidden)
    },
    move(item, position) {
      this.isSliding = true
      gsap.to(`#${item.id}`, {
        duration: 1,
        ease: "power1.inOut",
        scale: item.isActive ? 1 : 0.5,
        motionPath: {
          path: ".js--eclipse",
          align: ".js--eclipse",
          alignOrigin: [0.5, 0.5],
          start: item.position,
          end: position
        },
        onComplete: () => {
          this.isSliding = false
          item.position = position < 0 ? 1 + position : position % 1
        }
      });
    },
    onClick() {
      this.slide(1)
    },
    onScroll(deltaY) {
      this.slide(deltaY > 0 ? 1 : -1)
    },
    registerEvent() {
      // this.$el.style.overflow = "hidden"
      let touchY
      this.$el.addEventListener(this.getWheelEvent(this.$el), e => {
        const deltaY = e.deltaY || -e.wheelDelta
        this.onScroll(deltaY)
      })
      this.$el.addEventListener('touchstart', e => {
        touchY = e.touches[0].clientY;
      });
      this.$el.addEventListener('touchend', e => {
        const deltaY = -(e.changedTouches[0].clientY - touchY)
        if (deltaY === 0) return
        this.onScroll(deltaY)
      })
    },
    // detect available wheel event
    getWheelEvent(el) {
      if ('onwheel' in el) {
        // spec event type
        return 'wheel';
      } else if (el.onmousewheel !== undefined) {
        // legacy event type
        return 'mousewheel';
      } else {
        // older Firefox
        return 'DOMMouseScroll';
      }
    }
  }
}
</script>
