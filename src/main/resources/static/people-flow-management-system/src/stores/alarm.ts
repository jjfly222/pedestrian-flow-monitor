import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

interface Alarm {
  alarmInfoId: string,
  title: string,
  content: string
}
interface AlarmList {
  alarmListInfoId: string,
  warningTitle: string,
  sendTime: string,
  warningType: string,
  mapGroup: string,
  monitorId: string,
  monitorName: string,
  handleInfo: string,
  handleTime: string,
  alarmDetails: string,
  alarmInfoId: string,
  people_num: string,
  midu: string,
  sudu: string,
  max_people_speed: string
}
interface AlarmHandleInfo {
  alarmInfoSelect: string,
  alarmDetails: string
}
export const useAlarmStore = defineStore('alarmList', () => {
  const alarmInfo = ref<Alarm[]>([{
    alarmInfoId: '000',
    title: '[map_group] 的 [monitor_name] 监控点位，发现聚集告警',
    content: '监控组 [map_group] 的 [monitor_name] 监控点，于 [occur_time] 发现聚集告警，该监控点面积为：[area]，人员数量为：' +
    '[people_num]，密度: [density] 人/平方米，平均速度: [avg_speed]米/秒，请及时前' +
    '往疏导！'
  }, {
    alarmInfoId: '001',
    title: '[map_group] 的 [monitor_name] 监控点位，发现人员移动过缓现象',
    content: '监控组 [map_group] 的 [monitor_name] 监控点，于 [occur_time] 发现人员移动过缓现象，该监控点面积为：[area]，人员数量为：' +
    '[people_num]，密度: [density] 人/平方米，平均速度: [avg_speed]米/秒，请及时前' +
    '往现场疏通交通！！！'
  }])

  const alarmInfoList = ref<AlarmList[]>([{
    alarmListInfoId: '000',
    warningTitle: '人群聚集告警',
    sendTime: '2024-12-01 16:56:30',
    warningType: '聚集告警',
    mapGroup: '长泰广场',
    monitorId: '001',
    monitorName: '喷泉中心',
    handleInfo: '未处理',
    handleTime: '',
    alarmDetails: '',
    alarmInfoId: '000',
    people_num: '29',
    midu: '0.73',
    sudu: '0.69',
    max_people_speed: '1.1'
  }, {
    alarmListInfoId: '001',
    warningTitle: '人群速度缓慢',
    sendTime: '2024-11-30 18:24:12',
    warningType: '移动速度告警',
    mapGroup: '长泰广场',
    monitorId: '002',
    monitorName: '东庭院南街',
    handleInfo: '已安排疏通',
    handleTime: '2024-03-31 18:30:00',
    alarmDetails: '',
    alarmInfoId: '000',
    people_num: '1500',
    midu: '8',
    sudu: '0.2',
    max_people_speed: '0.5'
  }, {
    alarmListInfoId: '002',
    warningTitle: '人群聚集告警',
    sendTime: '2024-11-30 17:02:30',
    warningType: '聚集告警',
    mapGroup: '长泰广场',
    monitorId: '003',
    monitorName: '盒马鲜生拐角',
    handleInfo: '忽略',
    handleTime: '',
    alarmDetails: '',
    alarmInfoId: '000',
    people_num: '1500',
    midu: '8',
    sudu: '0.5',
    max_people_speed: '0.5'
  }, {
    alarmListInfoId: '003',
    warningTitle: '人群聚集告警',
    sendTime: '2024-11-30 16:10:25',
    warningType: '聚集告警',
    mapGroup: '金桥太茂商业中心',
    monitorId: '008',
    monitorName: '喜茶南门街',
    handleInfo: '未处理',
    handleTime: '',
    alarmDetails: '',
    alarmInfoId: '000',
    people_num: '1500',
    midu: '8',
    sudu: '0.5',
    max_people_speed: '0.5'
  }, {
    alarmListInfoId: '004',
    warningTitle: '聚集告警',
    sendTime: '2024-12-06 16:56:55',
    warningType: '聚集告警',
    mapGroup: '金桥太茂商业中心',
    monitorId: '009',
    monitorName: '南门入口区',
    handleInfo: '重发',
    handleTime: '',
    alarmDetails: '',
    alarmInfoId: '000',
    people_num: '68',
    midu: '3.57',
    sudu: '0.2',
    max_people_speed: '0.5'
  }])

  const addAlarmInfo = (alarmInfoData: Alarm) => {
    alarmInfo.value.push(alarmInfoData)
  }

  const editAlarmInfo = (alarmInfoData: Alarm) => {
    console.log('alarmInfoData', alarmInfoData)
    let editElemIndex = null
    alarmInfo.value.some((element: Alarm, index: number) => {
      if (element.alarmInfoId === alarmInfoData.alarmInfoId) {
        console.log('???')
        editElemIndex = index
        return true
      }
    })
    console.log('editElemIndex', editElemIndex)
    if (editElemIndex !== null) {
      alarmInfo.value[editElemIndex] = alarmInfoData
    }
    console.log('alarmInfo', alarmInfo)
  }
  const deleteAlarmInfo = (index: number) => {
    alarmInfo.value.splice(index, 1)
  }
  const handleAlarmInfo = (alarmInfo: AlarmHandleInfo, index: number) => {
    alarmInfoList.value[index].handleInfo = alarmInfo.alarmInfoSelect
    alarmInfoList.value[index].alarmDetails = alarmInfo.alarmDetails
  }
  return {
    alarmInfo, addAlarmInfo, editAlarmInfo, deleteAlarmInfo, alarmInfoList, handleAlarmInfo
  }
})