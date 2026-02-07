export const guideData = {
  serverSelection: {
    startNode: 'platform',
    nodes: {
      // 第一步：选择平台
      'platform': {
        question: '您正在使用哪个游戏版本？',
        options: [
          { label: 'Java 版 (电脑)', next: 'isp' },
          { label: '基岩版 (手机/Win10/主机)', next: 'bedrock_isp' }
        ]
      },

      // --- Java 版路径 ---
      'isp': {
        question: '请选择您的网络运营商：',
        options: [
          { label: '中国电信', next: 'region_select' },
          { label: '中国联通', next: 'region_select' },
          { label: '中国移动/广电', next: 'mobile_choice' }
        ]
      },
      'mobile_choice': {
        question: '检查是否支持 IPv6（手机流量默认支持）：',
        showIPv6: true, // 提示用户当前网络环境是否支持
        options: [
          { label: '使用 IPv6 (推荐)', next: 'result_ipv6' },
          { label: 'IPv6 不可用', next: 'region_select' }
        ]
      },
      'region_select': {
        question: '请选择您所在的地理位置：',
        options: [
          { label: '北方地区 (黄河以北)', next: 'result_zz' },
          { label: '华中/华南/西南地区', next: 'result_hb' },
          { label: '长三角/东部沿海', next: 'result_nb' }
        ]
      },

      // --- 基岩版路径 (受限路径) ---
      'bedrock_isp': {
        question: '检查是否支持 IPv6（手机流量默认支持）：',
        showIPv6: true, 
        options: [
          { label: '使用 IPv6 (推荐)', next: 'result_ipv6_be' },
          { label: 'IPv6 不可用', next: 'result_hb_be' }
        ]
      },

      // --- 结果节点 (Java) ---
      'result_zz': { 
        type: 'result', 
        name: '山东·枣庄通用节点', 
        content: 'frp-ten.com:46032', 
        desc: '💡 北方玩家首选，覆盖黄河以北地区。' 
      },
      'result_hb': { 
        type: 'result', 
        name: '湖北通用节点', 
        content: 'frp-tag.com:59465', 
        desc: '💡 华中、华南、西南地区用户推荐。' 
      },
      'result_nb': { 
        type: 'result', 
        name: '浙江·宁波通用节点', 
        content: 'frp-sun.com:23145', 
        desc: '💡 长三角及沿海地区玩家首选。' 
      },
      'result_ipv6': { 
        type: 'result', 
        name: 'IPv6 极速直连', 
        content: 'ipv6.csuftmc.dpdns.org', 
        desc: '🚀 端到端直连，延迟极低。' 
      },

      // --- 结果节点 (基岩版专用) ---
      'result_ipv6_be': { 
        type: 'result', 
        name: '基岩·IPv6 直连', 
        content: 'ipv6.csuftmc.dpdns.org', 
        desc: '🚀 基岩版首选推荐！手机流量或移动/广电宽带直连，稳定不掉线。' 
      },
      'result_hb_be': { 
        type: 'result', 
        name: '基岩·湖北三网', 
        content: 'frp-tag.com:59465', 
        desc: '⚡ 通用备用节点。全国通用线路（端口需填 59465）。' 
      }
    }
  }, 
};