<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Steps 步骤条</h1>
    <p class="summary">用于用户对某个任务的时间节点</p>
    <tdesign-demo-block title="01 类型" summary="横向可操作步骤条">
      <div class="step-demo">
        <t-steps v-model="current" :readonly="false">
          <t-step title="步骤描述"></t-step>
          <t-step title="选中步骤"></t-step>
        </t-steps>

        <t-steps v-model="current1" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </div>
      <div class="step-demo">
        <t-steps v-model="current2" :readonly="false">
          <t-step title="步骤描述"></t-step>
          <t-step title="选中步骤"></t-step>
          <t-step title="步骤描述"></t-step>
        </t-steps>
        <t-steps v-model="current3" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </div>
      <div class="step-demo">
        <t-steps v-model="current4" :readonly="false">
          <t-step title="步骤描述"></t-step>
          <t-step title="选中步骤"></t-step>
          <t-step title="步骤描述"></t-step>
          <t-step title="步骤描述"></t-step>
        </t-steps>
        <t-steps v-model="current5" :readonly="false" :options="stepData"> </t-steps>
        <t-steps v-model="current5" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="横向带图标可操作步骤条">
      <div class="step-demo">
        <t-steps v-model="current6" :readonly="false">
          <t-step title="步骤描述" content="辅助信息文字最多两行">
            <template #icon>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="design-iconfont">
                  <path
                    d="M12.25,1.5 C16.8063492,1.5 20.5,5.19365081 20.5,9.75 C20.5,12.7875661 17.75,17.0375661 12.25,22.5 C6.75,17.0375661 4,12.7875661 4,9.75 C4,5.19365081 7.69365081,1.5 12.25,1.5 Z M12.5,7 C10.8431458,7 9.5,8.34314575 9.5,10 C9.5,11.6568542 10.8431458,13 12.5,13 C14.1568542,13 15.5,11.6568542 15.5,10 C15.5,8.34314575 14.1568542,7 12.5,7 Z"
                    :fill="current6 === 0 ? '#fff' : '#0052D9'"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </template>
          </t-step>
          <t-step title="选中步骤" content="辅助信息文字最多两行">
            <template #icon>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="design-iconfont">
                  <path
                    d="M12.25,1.5 C16.8063492,1.5 20.5,5.19365081 20.5,9.75 C20.5,12.7875661 17.75,17.0375661 12.25,22.5 C6.75,17.0375661 4,12.7875661 4,9.75 C4,5.19365081 7.69365081,1.5 12.25,1.5 Z M12.5,7 C10.8431458,7 9.5,8.34314575 9.5,10 C9.5,11.6568542 10.8431458,13 12.5,13 C14.1568542,13 15.5,11.6568542 15.5,10 C15.5,8.34314575 14.1568542,7 12.5,7 Z"
                    :fill="current6 === 1 ? '#fff' : '#0052D9'"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </template>
          </t-step>
          <t-step title="步骤描述" content="辅助信息文字最多两行">
            <template #icon>
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="design-iconfont">
                  <path
                    d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12.7692308,5.84615385 L11.2307692,5.84615385 L11.2307692,12.7692308 L15.9448889,16.7248468 L16.9337929,15.5463169 L12.7687692,12.0511538 L12.7692308,5.84615385 Z"
                    :fill="current6 === 2 ? '#fff' : '#0052D9'"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </template>
          </t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="横向只读步骤条">
      <div class="step-demo">
        <t-steps v-model="current8" :readonly="true">
          <t-step title="已完成步骤"></t-step>
          <t-step title="当前步骤"></t-step>
          <t-step title="未完成步骤"></t-step>
        </t-steps>
        <t-steps v-model="current8" :readonly="true">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
        <t-steps v-model="current9" :readonly="true">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="竖向只读步骤条">
      <div class="step-demo">
        <t-steps v-model="current10" layout="vertical" :readonly="true">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
        <t-steps v-model="current11" layout="vertical" :readonly="true">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="竖向可操作步骤条">
      <div class="step-demo">
        <t-steps v-model="current14" layout="vertical" :readonly="false">
          <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
          <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="竖向简化只读步骤条">
      <div class="step-demo">
        <t-steps v-model="current12" theme="dot" layout="vertical">
          <t-step title="事件描述"></t-step>
          <t-step title="事件描述"></t-step>
          <t-step title="事件描述"></t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义内容步骤条">
      <div class="step-demo">
        <t-steps v-model="current13" layout="vertical">
          <t-step
            title="已完成步骤"
            content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
          >
            <template #extra>
              <img src="https://0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="" />
            </template>
          </t-step>
          <t-step
            title="当前步骤"
            content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
          ></t-step>
          <t-step
            title="未完成步骤"
            content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
          ></t-step>
        </t-steps>
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import config from '@/config';

const { prefix } = config;
const name = `${prefix}-steps-demo`;
export default defineComponent({
  name,
  setup() {
    const current = ref(1);
    const current1 = ref(1);
    const current2 = ref(1);
    const current3 = ref(1);
    const current4 = ref(1);
    const current5 = ref(1);
    const current6 = ref(1);
    const current7 = ref(1);
    const current8 = ref(1);
    const current9 = ref(1);
    const current10 = ref(1);
    const current11 = ref(1);
    const current12 = ref(1);
    const current13 = ref(1);
    const current14 = ref(1);
    const current15 = ref(1);
    const current16 = ref(1);
    const current17 = ref(0);

    const stepData = ref([
      {
        title: '步骤描述',
        content: '辅助信息文字最多两行',
      },
      {
        title: '选中步骤',
        content: '辅助信息文字最多两行',
      },
      {
        title: '未完成',
        content: '辅助信息文字最多两行',
      },
      {
        title: '未完成',
        content: '辅助信息文字最多两行',
      },
    ]);

    watch(current6, (now, pre) => {
      console.log(now, pre);
    });

    return {
      current,
      current1,
      current2,
      current3,
      current4,
      current5,
      current6,
      current7,
      current8,
      current9,
      current10,
      current11,
      current12,
      current13,
      current14,
      current15,
      current16,
      current17,
      stepData,
    };
  },
});
</script>

<style lang="less" scoped>
.step-icon {
  width: 16px;
  height: 16px;
}
</style>
