// 文件有效，为国际化做准备
import 'dayjs/locale/ja';

export default {
  actionSheet: {
    cancel: 'キャンセル',
  },
  calendar: {
    confirm: '確認',
    title: '日付の選択',
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    monthTitle: '{month} {year}',
    months: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
  },
  cascader: {
    title: 'タイトル',
    placeholder: 'オプションの選択',
  },
  dropdownMenu: {
    reset: 'リセット',
    confirm: '確認',
  },
  dateTimePicker: {
    title: '日付の選択',
    cancel: 'キャンセル',
    confirm: '確認',
    format: 'YYYY-MM-DD',
    yearLabel: '年',
    monthLabel: '月',
    dateLabel: '日',
    hourLabel: '時',
    minuteLabel: '分',
    secondLabel: '秒',
  },
  picker: {
    cancel: 'キャンセル',
    confirm: '確認',
  },
  pullDownRefresh: {
    loadingTexts: ['更新に引っ張ってください', '緩めて更新中', '更新中...', '更新が完了しました'],
  },
  rate: {
    valueText: '{value} スコア',
    noValueText: 'スコアなし',
  },
  tabBar: {
    newsAriaLabel: '新しいニュースがあります',
    moreNewsAriaLabel: 'たくさんのニュースがあります',
    haveMoreNewsAriaLabel: '{value}+ 件のニュースがあります',
    haveNewsAriaLabel: '{value} 件のニュースがあります',
  },
  table: {
    empty: 'データがありません',
  },
  list: {
    loading: '読み込み中...',
    loadingMoreText: 'クリックして詳細をロード',
    pulling: '更新に引っ張ってください...',
    loosing: '緩めて更新中...',
    success: 'リフレッシュ成功',
  },
  upload: {
    progress: {
      uploadingText: 'アップロード中...',
      waitingText: '待機中',
      failText: '失敗しました',
      successText: '成功しました',
    },
  },
  guide: {
    next: '次へ',
    skip: 'スキップ',
    finish: '完了',
    back: '戻る',
  },
};
