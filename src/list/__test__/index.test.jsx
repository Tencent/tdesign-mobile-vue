import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import List from '../list.vue'
import TLoading from '@/loading/loading.vue';
import TCell from '@/cell/index';
import { ref, nextTick } from 'vue';
const LOADING_TEXT_MAP = {
    loading: '加载中...',
    'load-more': '点击加载更多',
};
describe('list', () => {
    describe('props', () => {
        it(': asyncLoading', () => {
            const wrapper = mount(List, {
                props: {
                    // 加载中状态
                    asyncLoading: 'loading',
                }
            })
            expect(wrapper.findComponent(TLoading).props().text).toEqual(LOADING_TEXT_MAP.loading)
        });

        it(': footer', () => {
            const FOOTER_CONTENT = 'this is a footer content';
            const wrapper = mount(List, {
                props: {
                    footer: FOOTER_CONTENT,
                }
            })
            // expect(wrapper.text()).toEqual(FOOTER_CONTENT)
        });


        it(': header', () => {
            const HEADER_CONTENT = 'this is a header content';
            const wrapper = mount(List, {
                props: {
                    header: HEADER_CONTENT,
                }
            })
            expect(wrapper.text()).toEqual(HEADER_CONTENT)
        });
    })

    describe('slots', () => {
        it(': defualt', () => {
            const LIST_COUNT = 10;
            const MOCK_LIST = Array(LIST_COUNT).fill(1)
            const wrapper = mount(List, {
                slots: {
                    default: MOCK_LIST.map((item, index) => <TCell align="middle">
                        <span className='cell'>{index}</span>
                    </TCell>)
                }
            })
            expect(wrapper.findAllComponents(TCell).length).toEqual(LIST_COUNT);
        })
    })

    describe('event', () => {
        it(': load-more', () => {
            const LIST_COUNT = 10;
            const MOCK_LIST = Array(LIST_COUNT).fill(1)
            const wrapper = mount(List, {
                props: {
                    asyncLoading: 'load-more', // 点击加载更多, 用于 onLoadMore 点击事件, 当前演示页暂无演示代码
                    onLoadMore: ()=>{
                        MOCK_LIST.push(...Array(LIST_COUNT).fill(1))
                    }
                },
                slots: {
                    default: MOCK_LIST.map((item, index) => <TCell align="middle">
                        <span className='cell'>{index}</span>
                    </TCell>)
                }
            })
            expect(wrapper.findAllComponents(TCell).length).toEqual(LIST_COUNT);
        });
        it(': scroll', async (ctx) => {
            beforeEach(() => {
                vi.useFakeTimers()
              })
              afterEach(() => {
                vi.restoreAllMocks()
              })
            
            const LIST_COUNT = 10;
            const MOCK_LIST = ref(Array(LIST_COUNT).fill(1))
            const wrapper = mount(List, {
                props: {
                    asyncLoading: 'loading', // 点击加载更多, 用于 onLoadMore 点击事件, 当前演示页暂无演示代码
                    onScroll: ()=>{
                        MOCK_LIST.value.push(...Array(LIST_COUNT).fill(1))
                    }
                },
                slots: {
                    default: MOCK_LIST.value.map((item, index) => <TCell align="middle">
                        <span className='cell'>{index}</span>
                    </TCell>)
                }
            })
            
            wrapper.vm.$emit('scroll');
            nextTick(()=>{
                expect(MOCK_LIST.value.length).toEqual(LIST_COUNT * 2)
            })
        }); 
    })
})
