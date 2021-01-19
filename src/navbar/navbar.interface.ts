export interface DNavbarProps {
  title?: string,
  maxLen?: number,
  leftArrow?: boolean,
};

export const NavbarProps = {
  /**
   * @description 是否展示左侧箭头
   * @property leftArrow
   */
  leftArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 标题
   * @property title
   */
  title: {
    type: String,
    default: 'NavBar 导航条',
  },
  /**
   * @description 标题最大长度
   * @property maxLen
   */
  maxLen: {
    type: Number,
    default: 6,
  },
};
