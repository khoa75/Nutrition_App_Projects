import { theme } from 'antd';

export const adminTheme = {
  token: {
    colorPrimary: '#76FF03', // Lime Green
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Layout: {
      siderBg: '#001529',
      triggerBg: '#002140',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkSubMenuItemBg: 'transparent',
      darkItemColor: '#ffffff',
      darkItemHoverColor: '#1890ff',
      darkItemActiveColor: '#1890ff',
      darkSelectedColor: '#1890ff',
    },
    Table: {
      headerBg: '#f5f5f5',
      rowHoverBg: '#f0f0f0',
    },
    Card: {
      headerBg: '#fafafa',
      actionsBg: '#fafafa',
    },
    Button: {
      defaultBg: '#f0f0f0',
      defaultBorderColor: '#d9d9d9',
      defaultColor: '#000000',
    },
  },
};