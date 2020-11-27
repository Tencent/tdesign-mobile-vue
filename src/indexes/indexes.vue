<!--
 * @Author: Colahan
 * @Date: 2020-11-24 16:16:16
 * @FilePath: /tdesign-mobile-vue/src/indexes/indexes.vue
-->
<template>
  <div
    ref="indexesRoot"
    :class="state.componentName"
    @touchstart="handleRootTouchstart"
    @touchend="handleRootTouchend"
    @scroll="handleRootScroll">
    <div
      v-if="state.indexList.length > 0"
      :class="`${state.componentName}__sidebar`"
      @touchstart="handleSidebarTouchstart"
      @touchmove="handleSidebarTouchmove">
      <div
        v-for="item in state.indexList"
        :class="[
          `${state.componentName}__sidebar-item`,
          state.currentSidebar === item ? `${state.componentName}__sidebar-item--active` : '',
        ]"
        :data-index="item"
        @click.prevent="handleSidebarItemClick"
        :key="item">{{item}}</div>
    </div>
    <div v-if="state.showCurrentSidebar" :class="`${state.componentName}__current`">{{state.currentSidebar}}</div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { ref, reactive, SetupContext, defineComponent, PropType, computed, onMounted, watchEffect, watch } from 'vue'
import config from '../config'
const { prefix } = config

interface IndexesProps{
  indexList?: Array<string>
}
interface Touch {
  startX: number,
  startY: number,
  deltaX: number,
  deltaY: number,
  offsetX: number,
  offsetY: number,
}
interface State{
  componentName: String,
  indexList: Array<string>,
  children: Array<object>,
  showCurrentSidebar: Boolean,
  currentSidebar: String
}

const touch: Touch = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
}

let children: Array<Element> = []
const componentName: string = `${prefix}-indexes`

export default defineComponent({
  props: {
    indexList: Array as PropType<Array<string>>,
  },
  setup(props: IndexesProps) {
    let timeOut: number
    let rootScrollMask: boolean = false
    const indexesRoot = ref(null)
    const state: State = reactive({
      componentName,
      indexList: props?.indexList || [],
      showCurrentSidebar: false,
      currentSidebar: '',
      children: []
    })

    const scrollToView = (): void => {
      const targets = children.filter((ele: any) => {
        const { dataset } = ele
        return dataset && dataset.index === state.currentSidebar
      })
      targets && targets[0].scrollIntoView()
    }

    const getTitleNode = (): Array<Element> => {
      return Array.from(document.getElementsByClassName(`${componentName}__anchor`))
    }

    const setCurrentSidebar = (index: string) => {
      state.currentSidebar = index
      state.showCurrentSidebar = true
    }

    watchEffect(() => {
      if (state.showCurrentSidebar) {
        clearCurrentSidebarToast()
      }
    })

    onMounted(() => {
      children = getTitleNode()
      if (children) {
        const tempNode: any = children[0] && children[0] || {}
        const { index } = tempNode.dataset
        if (index !== undefined) {
          state.currentSidebar = index
        }
      }
    })

    const handleSidebarItemClick = (event: any) => {
      const { index } = event.target && event.target.dataset
      setCurrentSidebar(index)
      scrollToView()
    }

    const handleSidebarTouchstart = (event: TouchEvent): void => {
      const { touches } = event
      touch.startX = touches[0].clientX
      touch.startY = touches[0].clientX
    }

    const handleSidebarTouchmove = (event: TouchEvent): void => {
      const { touches } = event
      const { clientX, clientY } = touches[0];

      const target: any = document.elementFromPoint(clientX, clientY)
      if (target && target.className === `${componentName}__sidebar-item`) {
        const { index } = target.dataset
        if (index !== undefined && state.currentSidebar !== index) {
          setCurrentSidebar(index)
          scrollToView()
        }
      }
    }

    const handleRootTouchstart = () => {
      rootScrollMask = true
    }
    const handleRootTouchend = () => {
      rootScrollMask = false
    }

    const clearCurrentSidebarToast = (): void => {
      if (state.showCurrentSidebar && state.currentSidebar) {
        timeOut && clearTimeout(timeOut)
        timeOut = <any>setTimeout(() => {
          state.showCurrentSidebar = false
        }, 2000)
      }
    }

    const handleRootScroll = (event: any) => {
      if(!rootScrollMask) {
        return
      }

      const { scrollTop } = event.target
      const children: Array<any> = getTitleNode()
      let currentTarget: string = ''

      for (let ele of children) {
        const { offsetTop, clientHeight } = ele
        const targetClientVertical = offsetTop - clientHeight
        if (currentTarget === '' && targetClientVertical > 0) {
          currentTarget = children[0].dataset.index
        } else if (targetClientVertical < scrollTop) {
          currentTarget = ele.dataset.index
        } else {
          break
        }
      }
      setCurrentSidebar(currentTarget)
      return
    }

    return {
      state,
      indexesRoot,
      handleRootScroll,
      handleRootTouchend,
      handleRootTouchstart,
      handleSidebarItemClick,
      handleSidebarTouchmove,
      handleSidebarTouchstart,
    }
  }
})
</script>
<style lang="less">
.t-indexes{
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  position: relative;
  background-color: #F5F5F5;
  &__sidebar{
    position: fixed;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    &-item{
      padding: 5px 10px;
      &--active{
        color: #0052D9;
      }
    }
  }
  &__current{
    padding: 20px;
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .2);
  }
}
</style>
