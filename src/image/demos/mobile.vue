<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Image 图片</h1>
    <p class="summary">用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。</p>
    <tdesign-demo-block title="01 基本类型" summary="图片样式可为圆形、圆角方形、方形">
      <div class="image-group">
        <div class="image-demo">
          <t-image class="image-container" alt="一张图片" :src="imageSrc" shape="circle"></t-image>
        </div>
        <div class="image-demo">
          <t-image class="image-container" :src="imageSrc" shape="round"></t-image>
        </div>
        <div class="image-demo">
          <t-image class="image-container" :src="imageSrc" shape="square"></t-image>
        </div>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 填充方式" summary="可以个性化设置图片的填充模式和填充位置">
      <div class="image-group">
        <div class="image-demo">
          <t-image class="image-container" fit="contain" :src="imageSrc"></t-image>
          <p class="image-demo-tip">自适应宽高</p>
        </div>
        <div class="image-demo">
          <t-image class="image-container" fit="cover" :src="imageSrc"></t-image>
          <p class="image-demo-tip">裁剪</p>
        </div>
        <div class="image-demo" style="width: 150px">
          <t-image class="image-container" fit="fill" :src="imageSrc"></t-image>
          <p class="image-demo-tip">拉伸</p>
        </div>
        <div class="image-demo">
          <t-image class="image-container" fit="contain" position="center top" :src="imageSrc"></t-image>
          <p class="image-demo-tip">center top</p>
        </div>
        <div class="image-demo">
          <t-image class="image-container" fit="contain" position="0px 5px" :src="imageSrc"></t-image>
          <p class="image-demo-tip">0px 10px</p>
        </div>
        <div class="image-demo">
          <t-image class="image-container" fit="contain" position="50%" :src="imageSrc"></t-image>
          <p class="image-demo-tip">50%</p>
        </div>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 图片状态" summary="加载中提示">
      <div class="image-group">
        <div class="image-demo">
          <t-image class="image-container"></t-image>
          <p class="image-demo-tip">默认提示</p>
        </div>
        <div class="image-demo">
          <t-image class="image-container">
            <template #loading>
              <t-icon-loading />
            </template>
          </t-image>
          <p class="image-demo-tip">自定义提示</p>
        </div>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="" summary="加载失败提示">
      <div class="image-group">
        <div class="image-demo">
          <t-image class="image-container" src="x"></t-image>
          <p class="image-demo-tip">默认提示</p>
        </div>
        <div class="image-demo">
          <t-image lazy class="image-container" src="x">
            <template #error>
              <div class="error-text-tip">加载失败</div>
            </template>
          </t-image>
          <p class="image-demo-tip">自定义提示</p>
        </div>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { LoadingIcon as TIconLoading } from 'tdesign-icons-vue-next';
import config from '@/config';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  components: {
    TIconLoading,
  },
  setup() {
    return {
      name: ref(name),
      imageSrc: 'https://tdesign.gtimg.com/site/upload1.png',
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.image-group {
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
  margin-bottom: -10px;
  .image-demo {
    margin-bottom: 10px;
    margin-right: 7%;
    width: 72px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .image-container {
      width: 100%;
      height: 72px;
      .error-text-tip {
        font-size: 12px;
      }
    }
    .image-demo-tip {
      color: #646566;
      font-size: 14px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
