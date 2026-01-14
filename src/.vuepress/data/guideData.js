export const guideData = {
  serverSelection: {
    startNode: 'isp',
    nodes: {
      'isp': {
        question: '请选择您的网络运营商：',
        options: [
          { label: '中国电信', next: 'region_telecom' },
          { label: '中国联通', next: 'region_unicom' },
          { label: '中国移动/广电', next: 'region_mobile' }
        ]
      },
      'region_telecom': {
        question: '请选择您所在的地区：',
        options: [
          { label: '北方地区、黄河以北地区', next: 'zz' },
          { label: '华中、华南、西南地区', next: 'hb' },
          { label: '长三角、东部沿海', next: 'nb' }
        ]
      },
      'region_unicom': {
        question: '请选择您所在的地区：',
        options: [
          { label: '北方地区、黄河以北地区', next: 'zz' },
          { label: '华中、华南、西南地区', next: 'hb' },
          { label: '长三角、东部沿海', next: 'nb' }
        ]
      },
      'region_mobile': {
        question: '是否使用IPv6? (建议使用)',
        showIPv6: true, 
        options: [
          { label: '使用IPv6', next: 'mobile_ipv6' },
          { label: '不使用', next: 'mobile_ipv4' }
        ]
      },
      'mobile_ipv4': {
        question: '请选择您所在的地区：',
        options: [
          { label: '北方地区、黄河以北地区', next: 'zz' },
          { label: '华中、华南、西南地区', next: 'hb' },
          { label: '长三角、东部沿海', next: 'nb' }
        ]
      },
      // 结果节点
      'zz': { type: 'result', name: '枣庄通用节点', content: 'frp-ten.com:46032', desc: '适合北方用户使用。' },
      'hb': { type: 'result', name: '湖北通用节点', content: 'frp-tag.com:59465', desc: '适合华中、华南、西南地区用户使用' },
      'nb': { type: 'result', name: '宁波通用节点', content: 'frp-sun.com:23145', desc: '适合长三角、东部沿海地区用户使用' },
      'mobile_ipv6': { type: 'result', name: '移动IPv6节点', content: 'ipv6.csuftmc.dpdns.org', desc: '适合移动 IPv6用户使用' }
    }
  }, 

};