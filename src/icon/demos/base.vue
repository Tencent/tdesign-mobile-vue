<template>
  <div class="demo-icon-wrapper">
    <div
      class="demo-icon-iconbox"
      v-for="icon in icons"
      :key="icon"
    >
      <tdesign-icon :icon="icon" />
      <p :title="icon">
        {{ icon }}
      </p>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      icons: ['add', 'android', 'app', 'apple', 'arrow_down', 'arrow_left', 'arrow_right', 'arrow_up', 'ascending_order', 'attach', 'backtop', 'backward', 'barcode', 'books', 'bulletpoint', 'calendar', 'call', 'carret_down', 'carret_left', 'carret_right', 'carret_up', 'cart', 'chart', 'chart_bar', 'chart_bubble', 'chart_pit', 'chat', 'chrome', 'circle_add', 'circle_backtop', 'circle_clear', 'circle_down', 'circle_error', 'circle_help', 'circle_info', 'circle_left', 'circle_money', 'circle_play', 'circle_remove', 'circle_right', 'circle_stop', 'circle_tick', 'circle_time', 'circle_up', 'clear', 'cloud', 'cloud_download', 'cloud_upload', 'code', 'contact', 'creditcard', 'customerservice', 'delete', 'descending_order', 'desktop', 'double_left', 'double_right', 'down', 'download', 'edit', 'eject', 'enter', 'error', 'female', 'file', 'file_copy', 'file_exel', 'file_jpg', 'file_new', 'file_open', 'file_paste', 'file_pdf', 'file_powerpoint', 'file_unknown', 'file_word', 'filter', 'first_page', 'flag', 'folder_new', 'fork', 'forward', 'fullsreen', 'fullsreen_exit', 'gift', 'github', 'group_add', 'heart', 'help', 'history', 'home', 'ie', 'image', 'inbox', 'info', 'internet', 'jump', 'label', 'laptop', 'last_page', 'left', 'line_circle_add', 'line_circle_clear', 'line_circle_down', 'line_circle_error', 'line_circle_help', 'line_circle_info', 'line_circle_left', 'line_circle_play', 'line_circle_remove', 'line_circle_right', 'line_circle_stop', 'line_circle_tick', 'line_circle_time', 'line_circle_up', 'line_star', 'link', 'link_unlink', 'loading', 'loading_gradient', 'loading_sand', 'location', 'lock_off', 'lock_on', 'login', 'mail', 'male', 'management', 'menu_fold', 'menu_unfold', 'mobile', 'mobile_vibrate', 'more', 'next', 'notification', 'on', 'order_horizontal_bottomup', 'order_horizontal_normal', 'order_horizontal_updown', 'order_verticle_bottomup', 'order_verticle_normal', 'order_verticle_updown', 'photo', 'pin', 'previous', 'print', 'qrcode', 'queue', 'rectangle_add', 'rectangle_clear', 'rectangle_down', 'rectangle_left', 'rectangle_remove', 'rectangle_right', 'rectangle_tick', 'rectangle_up', 'refresh', 'remove', 'right', 'rollback', 'save', 'scan', 'secured', 'server', 'setting', 'share', 'share_alt', 'shop', 'sound', 'star', 'star_stroke', 'stop', 'swap', 'swap_left', 'swap_right', 'table', 'thumb_down', 'thumb_up', 'tick', 'tips', 'tools', 'up', 'upload', 'usb', 'user', 'user_add', 'user_delete', 'usergroup', 'usergroup_delete', 'video', 'view_column', 'view_list', 'view_module', 'visibility_off', 'visibility_on', 'wallet', 'wifi', 'windows', 'zoom', 'zoom_in', 'zoom_out'],
    };
  },
  mounted() {
    const clipboard = new Clipboard('.demo-icon-iconbox', {
      text: trigger => trigger.querySelector('p').innerText,
    });
    clipboard.on('success', (e) => {
      this.$message.closeAll();
      this.$message.success(`${e.text} 已复制`);
    });
  },
};
</script>
