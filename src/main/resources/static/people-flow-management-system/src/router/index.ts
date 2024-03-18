import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MenuCtl from "@/views/menuCtl.vue"
import home from "@/views/homepage.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // redirect: "/home",
    component: home,
    meta: { title: '首页', icon: 'HomeFilled' },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
        meta: { title: '首页', icon: 'HomeFilled' }
      },
      // 权限管理
      {
        path: "/auth_manager",
        name: "auth_manager",
        component: MenuCtl,
        meta: { title: '权限管理', icon: 'Tools' },
        children: [
          {
            path: "user_manager",
            name: "user_manager",
            component: () => import("@/views/auth_manager/user_manager.vue"),
            meta: { title: '用户管理' }
          },
          {
            path: "permission_manager",
            name: "permission_manager",
            component: () => import("@/views/auth_manager/permission_manager.vue"),
            meta: { title: '地图组权限分配' }
          },
          {
            path: "approve_manage",
            name: "approve_manage",
            component: () => import("@/views/auth_manager/approve_manage.vue"),
            meta: { title: '审批管理' }
          }
        ]
      },
      // 地图组管理
      {
        path: "/map_group_manager",
        name: "map_group_manager",
        component: MenuCtl,
        meta: { title: '地图组管理', icon: 'Place' },
        children: [
          {
            path: "map_group_setting",
            name: "map_group_setting",
            component: () => import("@/views/map_group_manager/map_group_setting.vue"),
            meta: { title: '地图组设置' }
          },
          {
            path: "monitor_info_list",
            name: "monitor_info_list",
            component: () => import("@/views/map_group_manager/monitor_info/monitor_info_list.vue"),
            meta: { title: '监控信息设置' }
          },
          {
            path: "monitor_info_setting",
            name: "monitor_info_setting",
            component: () => import("@/views/map_group_manager/monitor_info/monitor_info_setting.vue"),
            meta: { title: '监控信息设置', hidden: true }
          },
          {
            path: "param_setting_list",
            name: "param_setting_list",
            component: () => import("@/views/map_group_manager/param_setting/param_setting_list.vue"),
            meta: { title: '参数模版设置' }
          },
          {
            path: "param_setting_add",
            name: "param_setting_add",
            component: () => import("@/views/map_group_manager/param_setting/param_setting_add.vue"),
            meta: { title: '参数模版设置', hidden: true }
          }
        ]
      },
      // 告警管理
      {
        path: "/alarm_manager",
        name: "alarm_manager",
        component: MenuCtl,
        meta: { title: '告警管理', icon: 'AlarmClock' },
        children: [
          {
            path: "alarm_info_manager",
            name: "alarm_info_manager",
            component: () => import("@/views/alarm_manager/alarm_info_manager.vue"),
            meta: { title: '告警信息管理' }
          },
          {
            path: "alarm_info_template_manager",
            name: "alarm_info_template_manager",
            component: () => import("@/views/alarm_manager/alarm_info_template_manager.vue"),
            meta: { title: '告警信息模板设置' }
          }
        ]
      },
      // 个人信息管理
      {
        path: "/personal_manager",
        name: "personal_manager",
        component: () => import("@/views/auth_manager/personal_manager.vue"),
        meta: { title: '个人信息管理', icon: 'User' }
      },
      // 监控数据管理
      {
        path: "/query_record_operation",
        name: "query_record_operation",
        component: MenuCtl,
        meta: { title: '监控数据管理', icon: 'VideoCameraFilled' },
        children: [
          {
            path: "monitor_view",
            name: "monitor_view",
            component: () => import("@/views/query_record_operation/monitor_view.vue"),
            meta: { title: '监控查看' }
          },
          {
            path: "report_view",
            name: "report_view",
            component: () => import("@/views/query_record_operation/report_view.vue"),
            meta: { title: '报表查看' }
          },
          {
            path: "warning_info_view",
            name: "warning_info_view",
            component: () => import("@/views/query_record_operation/warning_info_view.vue"),
            meta: { title: '告警信息查看' }
          },
          
        ]
      },
      
    ]
  },
  
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;